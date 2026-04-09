import type { User } from "../../user/types/user.types";
export interface LoginCredentials{
    email:string;
    password:string;
}

export interface SignupData{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface SignupDataWithName {
    name?:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    user:User;
}

// export interface TokenPayload{
//     sub:string;
//     email:string;
//     role:'user' | 'admin';
//     exp:number;
//     iat:number;
// }


export interface AuthContextType{
    user:User|null;
    isLoading:boolean;
    error:string | null;
    isAuthenticated:boolean;
    login:(credentials:LoginCredentials)=> Promise<void>;
    signup:(data:SignupData)=> Promise<void>;
    logout:() => Promise<void>;
     refreshUser: () => Promise<User>;
     forceRefreshToken?: () => Promise<void>;
     hasRole?: (role: string) => boolean;
}
