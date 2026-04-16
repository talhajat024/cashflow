import * as signalR from '@microsoft/signalr';
import type { Notification } from '../types/notifications.types';

type NotificationCallback = (notification: Notification) => void;
type UnreadCountCallback = (count: number) => void;
type ConnectionStatusCallback = (isConnected: boolean) => void;

class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private notificationCallbacks: NotificationCallback[] = [];
    private unreadCountCallbacks: UnreadCountCallback[] = [];
    private statusCallbacks: ConnectionStatusCallback[] = [];
    private isConnecting = false;

    async connect(accessToken: string): Promise<void> {
        if (this.connection?.state === signalR.HubConnectionState.Connected) {
            console.log('SignalR already connected');
            return;
        }

        if (this.isConnecting) {
            console.log('SignalR connection already in progress');
            return;
        }

        this.isConnecting = true;

        const hubUrl = `${import.meta.env.VITE_API_URL || 'https://localhost:5008'}/notificationHub`;

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(hubUrl, {
                accessTokenFactory: () => accessToken,
                transport: signalR.HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    if (retryContext.elapsedMilliseconds < 60000) {
                        return 2000;
                    }
                    if (retryContext.elapsedMilliseconds < 300000) {
                        return 10000;
                    }
                    return 30000;
                },
            })
            .withKeepAliveInterval(15000)
            .build();

        // Set up event handlers
        this.connection.on('ReceiveNotification', (notification: any) => {
            const transformedNotification = this.transformBackendNotification(notification);
            this.notificationCallbacks.forEach(cb => cb(transformedNotification));
        });

        this.connection.on('UnreadCountUpdated', (count: number) => {
            this.unreadCountCallbacks.forEach(cb => cb(count));
        });

        // Connection status handlers
        this.connection.onreconnecting(() => {
            console.log('SignalR reconnecting...');
            this.statusCallbacks.forEach(cb => cb(false));
        });

        this.connection.onreconnected(() => {
            console.log('SignalR reconnected');
            this.statusCallbacks.forEach(cb => cb(true));
        });

        this.connection.onclose(() => {
            console.log('SignalR connection closed');
            this.statusCallbacks.forEach(cb => cb(false));
        });

        try {
            await this.connection.start();
            console.log('SignalR connected successfully');
            this.statusCallbacks.forEach(cb => cb(true));
        } catch (error) {
            console.error('SignalR connection failed:', error);
            this.statusCallbacks.forEach(cb => cb(false));
        } finally {
            this.isConnecting = false;
        }
    }

    async disconnect(): Promise<void> {
        if (this.connection) {
            try {
                await this.connection.stop();
                console.log('SignalR disconnected');
            } catch (error) {
                console.error('Error disconnecting SignalR:', error);
            } finally {
                this.connection = null;
            }
        }
    }

    onNotification(callback: NotificationCallback): () => void {
        this.notificationCallbacks.push(callback);
        return () => {
            this.notificationCallbacks = this.notificationCallbacks.filter(cb => cb !== callback);
        };
    }

    onUnreadCountUpdate(callback: UnreadCountCallback): () => void {
        this.unreadCountCallbacks.push(callback);
        return () => {
            this.unreadCountCallbacks = this.unreadCountCallbacks.filter(cb => cb !== callback);
        };
    }

    onConnectionStatus(callback: ConnectionStatusCallback): () => void {
        this.statusCallbacks.push(callback);
        return () => {
            this.statusCallbacks = this.statusCallbacks.filter(cb => cb !== callback);
        };
    }

    get isConnected(): boolean {
        return this.connection?.state === signalR.HubConnectionState.Connected;
    }

    private transformBackendNotification(backend: any): Notification {
        let type: Notification['type'] = 'system';
        
        if (backend.type?.includes('invoice') || backend.type?.includes('payment') || backend.type?.includes('transaction')) {
            type = 'transaction';
        } else if (backend.type?.includes('alert') || backend.type?.includes('warning')) {
            type = 'alert';
        } else if (backend.type?.includes('reminder')) {
            type = 'reminder';
        } else if (backend.type?.includes('achievement')) {
            type = 'achievement';
        } else if (backend.type?.includes('mention')) {
            type = 'mention';
        }
        
        return {
            id: backend.id,
            type,
            title: backend.title,
            description: backend.message || backend.description,
            timestamp: new Date(backend.createdAt || backend.timestamp),
            read: backend.isRead || backend.read || false,
            actionable: backend.type === 'invoice_created' || backend.type === 'payment_received',
            actionUrl: backend.type === 'invoice_created' ? '/dashboard/invoice' : undefined,
            actionLabel: backend.type === 'invoice_created' ? 'View Invoice' : undefined,
            metadata: {
                amount: backend.amount,
                currency: backend.currency,
                category: backend.type,
                sender: backend.sender,
            },
        };
    }
}

export const signalRService = new SignalRService();