export interface User
{
    id:string;
    name:string;
    email:string;
    role:'user' | 'admin';
    avatar?:string;
    initials:string;
    createdAt?:string;
    lastLogin?:string;
}

export interface UserMenuState
{
    isOpen?:boolean;
}

export interface UserContextType{
    user:User | null;
    loading :boolean;
    error?:string | null;
    signOut:()=> Promise<void>;
    refreshUser?:()=> Promise<User>;
}