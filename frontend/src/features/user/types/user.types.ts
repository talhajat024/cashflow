export interface User
{
    id:string;
    name:string;
    email:string;
    avatar?:string;
    initials:string;
    role?:'admin' | 'user' | 'manager';
    createdAt?:string;
    lastLogin?:string;
}

export interface UserMenuProps
{
    className?:string;
}