import type { User } from "../types/user.types";

export const getInitials =(firstName:string,lastName:string):string=>{
    const firstInitial = firstName ? firstName[0] :'';
    const lastInitial = lastName ? lastName[0] :'';
    return `${firstInitial}${lastInitial}`.toUpperCase().slice(0, 2);
}

const getInitialsFromName = (name:string):string=>{
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0,2);
}

export const createUserFromApi = (apiData:any):User=>{
    const firstName= apiData.firstName|| '';
    const lastName = apiData.lastName || '';
    const fullName = apiData.fullName || apiData.name || `${firstName} ${lastName}`.trim();

    return{
         id: apiData.id,
        firstName: firstName,
        lastName: lastName,
        name: fullName,
        email: apiData.email,
        role: apiData.role === 'admin' ? 'admin' : 'user',
        avatar: apiData.avatar,
        initials: getInitials(firstName, lastName) || getInitialsFromName(fullName) || 'U',
        createdAt: apiData.createdAt || new Date().toISOString(),
        lastLogin: apiData.lastLogin,
        phoneNumber: apiData.phoneNumber,
        city: apiData.city,
        state: apiData.state,
        zipCode: apiData.zipCode,
        country: apiData.country,
        fullAddress: apiData.fullAddress,
        currency: apiData.currency,
        defaultPaymentMethod: apiData.defaultPaymentMethod,
        allowApplePay: apiData.allowApplePay,
        allowGooglePay: apiData.allowGooglePay,
    }
}