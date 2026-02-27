export interface LoginCredentials{
    email:string;
    password:string;
}

export interface SignupData{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface AuthResponse{
    accessToken:string;
    refreshToken:string;
    user:User;
}

export interface User{
    id:string;
    name:string;
    email:string;
    role:'user' | 'admin';
    avatar?:string;
    createdAt:string;
}

export interface TokenPayload{
    sub:string;
    email:string;
    role:string;
    exp:number;
    iat:number;
}
