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

