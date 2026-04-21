import { useState } from "react";
import { useProfile } from "../../user/hooks/useProfile";
import { useAuth } from "../../auth";
import { Spinner } from "../../../shared/ui/spinner";
import { ProfileSidebar } from "../components/Profile/ProfileSidebar";
import { ProfileContent } from "../components/Profile/ProfileContent";
import { DeleteAccountModal } from "../components/Profile/DeleteAccountModal";
import { NotificationToast } from "../components/Profile/NotificationToast";

export type TabType= 'profile' | 'security' | 'payments';

export default function ProfilePage(){
  const {profile,loading,updateProfile,changePassword,updatePaymentMethod,deleteAccount}=useProfile();
  const {logout}=useAuth();
  const [activeTab,setActiveTab]=useState<TabType>('profile');
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const [notification,setNotification]=useState<{type:'success'|'error';message:string} | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteAccount=async()=>{
    const result = await deleteAccount();
    if (result.success) {
        logout();
    } else {
        showNotification('error', result.message);
        setShowDeleteModal(false);
    }
  }

  if(loading){
    return (
      <div className="flex items-center justify-center min-h-screen">
          <Spinner size="lg" />
      </div>
  );
  }

  return(
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NotificationToast notification={notification}/>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <ProfileSidebar 
                        profile={profile}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        onDeleteClick={() => setShowDeleteModal(true)}
                    />
                    
                    <ProfileContent 
                        profile={profile}
                        activeTab={activeTab}
                        onUpdateProfile={updateProfile}
                        onChangePassword={changePassword}
                        onUpdatePayment={updatePaymentMethod}
                        onShowNotification={showNotification}
                    />
                </div>
      </div>

      <DeleteAccountModal 
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteAccount}
            />

    </div>
  )
}