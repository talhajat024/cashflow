import { useState,useEffect,useCallback } from "react";
import { getProfile,updateUserProfile,changePassword,updatePaymentMethod,updateAvatar,deleteAccount } from "../api/user.api";
import type { User } from "../types/user.types";

interface ChangePasswordData{
    currentPassword:string;
    newPassword:string;
    confirmPassword:string;
}

interface PaymentMethodData{
    currency:string;
    paymentMethod:string;
    allowApplePay:boolean;
    allowGooglePay:boolean;
}

export const useProfile=()=>{
    const [profile,setProfile]=useState<User | null>(null);
    const [loading , setLoading]=useState(true);
    const [error,setError]=useState<string | null>(null);
    const [saving,setSaving]=useState(false);

    const fetchProfile=useCallback(async()=>{
        try{
            setLoading(true);
            const data= await getProfile();
            setProfile(data);
            setError(null);
        }
        catch(err:any){
            setError(err.response?.data?.message || 'Failed to load profile');
        }
        finally{
            setLoading(false);
        }
    },[])

    const updateProfile=useCallback(async(data:Partial<User>)=>{
        try{
            setSaving(true);
            const updatedProfile= await updateUserProfile(data);
            setProfile(updatedProfile);
            return {success:true,message:'Profile updated successfully'};
        }
        catch(err:any){
            return {success:false,message:err.response?.data?.message || 'Failed to update profile'};
        }finally{
            setSaving(false);
        }
    },[]);

    const changeUserPassword = useCallback(async(data:ChangePasswordData)=>{
        if(data.newPassword !== data.confirmPassword){
            return {success:false,message:'New Password do not match'};
        }
        if(data.newPassword.length < 8){
            return {success:false,message:'Password must be atleast 8 characters.'};
        }
        try{
            setSaving(true);
            await changePassword(data.currentPassword,data.newPassword);
            return {success:true,message:'Password changed successfully'};
        }
        catch(err:any){
            return {success:false,message:err.response?.data?.message || 'Failed to change Password'};
        }
        finally{
            setSaving(false);
        }
    },[]);

    const updatePayment=useCallback(async(data:PaymentMethodData)=>{
        try{
            setSaving(true);
            await updatePaymentMethod(data);
            if(profile){
                setProfile({
                    ...profile,
                    currency:data.currency,
                    defaultPaymentMethod:data.paymentMethod,
                    allowApplePay:data.allowApplePay,
                    allowGooglePay:data.allowGooglePay,
                });
            }
            return {success:true,message:'Payment method updated successfully'};
        }
        catch(err:any){
            return {success:false,message:err.response?.data?.message || 'Failed to update payment method'};
        }finally{
            setSaving(false);
        }
    },[profile])

    const uploadAvatar = useCallback(async(avatarUrl:string)=>{
        try{
            setSaving(true);
            const result= await updateAvatar(avatarUrl);
            if(profile){
                setProfile({...profile,avatar:result.avatarUrl});
            }
            return {success:true,message:'Avatar Updated successfully'};
        }
        catch(err:any){
            return {success:false,message:err.response?.data?.message || ' Failed to update avatar'};
        }
        finally{
            setSaving(false);
        }
    },[profile]);

    const removeAccount= useCallback(async()=>{
        try{
            setSaving(true);
            await deleteAccount();
            return {success:true,message:'Account deleted successfully'};
        }
        catch(err:any){
            return {success:false,message:err.response?.data?.message || 'Failed to delete account'}
        }finally{
            setSaving(false);
        }
    },[])

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        profile,
        loading,
        error,
        saving,
        fetchProfile,
        updateProfile,
        changePassword: changeUserPassword,
        updatePaymentMethod: updatePayment,
        updateAvatar: uploadAvatar,
        deleteAccount: removeAccount,
    };
}