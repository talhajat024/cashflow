import { httpClient } from "../../../shared/api/httpClient";
import type { User } from "../types/user.types";

// Optional :  Update user profile
export async function updateUserProfile(data:Partial<User>):Promise<User>
{
    try
    {
        const response = await httpClient.patch<User>('/user/profile',data);
        return response.data;
    }
    catch(error)
    {
        console.error('Update profile error:', error);
        throw error;
    }
}

// optional :change password
export async function changePassword(currentPassword:string,newPassword:string):Promise<void>{
   try {
        await httpClient.post('/user/change-password', {
            currentPassword,
            newPassword,
        });
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
}

// Get full Profile 
export async function getProfile():Promise<User> {
    try {
        const response = await httpClient.get<User>('/profile');
        return response.data;
    } catch (error) {
        console.error("Get profile error",error);
        throw error;
    }
}

// Update payment method 
export async function updatePaymentMethod(data:{
    currency:string;
    paymentMethod:string;
    allowApplePay:boolean;
    allowGooglePay:boolean;
}):Promise<{message:string}> {
    try {
        const response= await httpClient.put('/profile/payment-method',data);
        return response.data;
    } catch (error) {
        console.error('Update payment method error:',error);
        throw error;
    }
}

// Update avatar
export async function updateAvatar(avatarUrl:string):Promise<{message:string;avatarUrl:string}>{
    try{
        const response = await httpClient.put('/profile/avatar',{avatarUrl});
        return response.data;
    }
    catch(error){
        console.error('Update avatar error:',error);
        throw error;
    }
}

// Delete account
export async function deleteAccount():Promise<{message:string}>  {
    try {
        const response = await httpClient.delete('/profile');
        return response.data;
    } catch (error) {
        console.error('Delete account error:',error);
        throw error;
    }
}

