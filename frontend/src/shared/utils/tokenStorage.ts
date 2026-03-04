import type { User } from "../../features/user/types/user.types";

let userData:User |null=null;

export const tokenStorage = {
    setTokens: (accessToken: string, refreshToken: string) => {
      if (!document.cookie.includes('XSRF-TOKEN=')) {
        console.warn('CSRF token not found - server may not have set it');
      } else {
        console.log('Auth tokens set via HttpOnly cookies');
      }
    },
    getAccessToken:():null=>{
        console.warn('Access tokens are HttpOnly - cannot access from JS');
        return null;
    },

    getRefreshToken:():null=>{
        console.log("Refresh tokens are httpOnly - cannot access from JS");
        return null;
    },

    setUser:(user:User)=>{
        userData=user;
        try{
            sessionStorage.setItem('user',JSON.stringify(user));
        }
        catch(error)
        {
            console.error('Failed to persist user data:',error);
        }
    },
    getUser:(): User | null =>{
        if(userData)
        {
            return userData;
        }
        const stored = sessionStorage.getItem('user');
        if(stored)
        {
            try{
                userData= JSON.parse(stored) as User;
                return userData;
            }
            catch{
                sessionStorage.removeItem('user');
                return null;
            }
        }
        return null;
    },
    clearTokens:()=>{
        userData=null;
        sessionStorage.removeItem('user');
        console.log("User data cleared.");
    },
    hasTokens: (): boolean => {
    const hasCsrfToken = document.cookie.includes('XSRF-TOKEN=');
    const hasUserData = !!tokenStorage.getUser();
    
    if (hasCsrfToken && !hasUserData) {
      console.warn('Inconsistent auth state — clearing');
      tokenStorage.clearTokens();
      return false;
    }

    if (!hasCsrfToken && hasUserData) {
      console.warn('User data without CSRF token — clearing');
      tokenStorage.clearTokens();
      return false;
    }
    return hasCsrfToken && hasUserData;
    },
    getAuthState:()=>{
        return{
            isAuthenticated:tokenStorage.hasTokens(),
            hasUserData:!!tokenStorage.getUser(),
            cookies:document.cookie.split('; ').filter(c=> c.includes('XSRF-TOKEN') || c.includes('access'))
            .map(c=> c.split('=')[0]),
        };
    }
}

