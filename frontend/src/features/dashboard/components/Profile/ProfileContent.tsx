import { ProfileInfoTab } from './ProfileInfoTab';
import { SecurityTab } from './SecurityTab';
import { PaymentMethodsTab } from './PaymentMethodsTab';
import type { TabType } from '../../pages/ProfilePage';
import type { User } from '../../../user/types/user.types';

interface ProfileContentProps{
    profile:User | null;
    activeTab:TabType;
    onUpdateProfile:(data:Partial<User>)=> Promise<{success:boolean;message:string}>;
    onChangePassword:(data:any)=> Promise<{success:boolean;message:string}>;
    onUpdatePayment:(data:any)=> Promise<{success:boolean;message:string}>;
    onShowNotification:(type:'success' | 'error',message:string)=> void;
}

export function ProfileContent({profile,activeTab,onUpdateProfile,onChangePassword,onUpdatePayment,onShowNotification}:ProfileContentProps){
    switch(activeTab){
        case 'profile':
            return <ProfileInfoTab profile={profile} onUpdate={onUpdateProfile} onNotify={onShowNotification}/>;
        case 'security':
            return <SecurityTab onChangePassword={onChangePassword} onNotify={onShowNotification}/>
        case 'payments':
            return <PaymentMethodsTab profile={profile} onUpdate={onUpdatePayment} onNotify={onShowNotification} />;
        default:
            return null;
    }
}