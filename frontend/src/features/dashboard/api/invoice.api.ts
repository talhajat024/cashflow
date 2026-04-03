import { httpClient } from "../../../shared/api/httpClient";
import type { 
  Invoice, 
  InvoiceSummary, 
  Client, 
  CreateInvoiceRequest, 
  CreateClientRequest 
} from "../types/invoice.types";

export const invoiceApi = {
  // Invoices - status is number from backend enum
  getInvoices: async (status?: number): Promise<Invoice[]> => {
    const params = status !== undefined ? { status } : {};
    const response = await httpClient.get<Invoice[]>("/invoice", { params });
    return response.data;
  },

  getInvoiceSummary: async (): Promise<InvoiceSummary> => {
    const response = await httpClient.get<InvoiceSummary>("/invoice/summary");
    return response.data;
  },

  createInvoice: async (data: CreateInvoiceRequest): Promise<Invoice> => {
    const response = await httpClient.post<Invoice>("/invoice", data);
    return response.data;
  },

  updateInvoiceStatus: async (id: number, status: number): Promise<Invoice> => {
    const response = await httpClient.put<Invoice>(`/invoice/${id}/status`, { status });
    return response.data;
  },

  // Clients
  getClients: async (): Promise<Client[]> => {
    const response = await httpClient.get<Client[]>("/client");
    return response.data;
  },

  createClient: async (data: CreateClientRequest): Promise<Client> => {
    const response = await httpClient.post<Client>("/client", data);
    return response.data;
  },
};