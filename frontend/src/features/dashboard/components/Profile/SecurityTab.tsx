import { use, useState } from "react";
import { Card } from "../../../../shared/ui";
import { Button } from "../../../../shared/ui";
import { Input } from "../../../../shared/ui";

interface SecurityTabProps{
    onChangePassword:(data:any)=>Promise<{success:boolean;message:string}>;
    onNotify:(type:'success' | 'error',message:string)=> void;
}

export function SecurityTab({onChangePassword,onNotify}:SecurityTabProps){
    const [loading,setLoading]=useState(false);
    const [passwordData,setPasswordData]=useState({
        currentPassword:'',
        newPassword:'',
        confirmNewPassword:''
    });

    const handleSubmit=async()=>{
        if(passwordData.newPassword !== passwordData.confirmNewPassword){
            onNotify('error','New password do not match');
            return;
        }

        if(passwordData.newPassword.length < 8){
            onNotify('error','Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        const result = await onChangePassword(passwordData);
        if(result.success){
            setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            onNotify('success', result.message);
        }
        else{
            onNotify('error', result.message);
        }
        setLoading(false);
    };

    return(
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">Update your password to keep your account secure</p>
                </div>

                <div className="space-y-5 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <Input type="password" value={passwordData.currentPassword} onChange={(e)=> setPasswordData({...passwordData,currentPassword:e.target.value})}
                        placeholder="Enter your current password"
                        className="rounded-xl"
                        />
                    </div>
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <Input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            placeholder="Enter new password"
                            className="rounded-xl"
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <Input
                            type="password"
                            value={passwordData.confirmNewPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
                            placeholder="Confirm new password"
                            className="rounded-xl"
                        />
                    </div>
                    <Button 
                        onClick={handleSubmit} 
                        disabled={loading || !passwordData.currentPassword || !passwordData.newPassword}
                        className="rounded-xl mt-4"
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </Button>
                </div>
            </div>
        </Card>
    );
}
