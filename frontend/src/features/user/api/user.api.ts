import { httpClient } from "../../../shared/api/httpClient";
import type { User } from "../types/user.types";

export async function getCurrentUser():Promise<User>{
    const response = await httpClient.get<User>('/user/me');
    return response.data;
}

export async function signOut():Promise<void>{
    await httpClient.post('/auth/logout');
    localStorage.removeItem('token');
}

// Optional :  Update user profile
export async function updateUserProfile(data:Partial<User>):Promise<User>
{
    const response = await httpClient.patch<User>('/user/profile',data);
    return response.data;
}

// optional :change password
export async function changePassword(currentPassowrd:string,newPassword:string):Promise<void>{
    await httpClient.post('/user/change-password',{
        currentPassowrd,
        newPassword
    });
}

