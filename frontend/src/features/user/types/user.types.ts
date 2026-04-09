export interface User
{
    id:string;
    firstName:string;
    lastName:string;
    name:string;
    email:string;
    role:'user' | 'admin';
    avatar?:string;
    initials:string;
    createdAt?:string;
    lastLogin?:string;

    // profile fields
    phoneNumber?:string;
    city?:string;
    state?:string;
    zipCode?:string;
    country?:string;
    fullAddress?:string;
    currency?:string;
    defaultPaymentMethod?:string;
    allowApplePay?:boolean;
    allowGooglePay?:boolean;
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