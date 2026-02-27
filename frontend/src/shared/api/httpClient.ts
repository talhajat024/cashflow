import axios from 'axios';

export const httpClient = axios.create({
    baseURL:import.meta.env.VITE_API_BASE_URL,
    headers:{
        "Content-Type":"application/json",
    },
    withCredentials:true,
});

let csrfToken: string | null=null;

// function to extract csrf token from cookie
const extractCsrfTokenFromCookie =():string| null=>{
  const match= document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? match[1] :null;
}

//  function to refresh CSRF token (call this on login)
export const refreshCsrfToken=()=>{
  csrfToken=extractCsrfTokenFromCookie();
};


httpClient.interceptors.request.use((config) => {

  const token= csrfToken || extractCsrfTokenFromCookie();
  if(token)
  {
      config.headers['X-CSRF-TOKEN'] = token;
      config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});



httpClient.interceptors.response.use(
  (response) => {
    const newCsrfToken = response.headers['x-csrf-token'] || response.headers['x-xsrf-token'];
        if (newCsrfToken) {
            csrfToken = newCsrfToken;
        }
        
        return response;
  },
  (error) => {
    if(error.response?.status===401)
    {
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    if(error.response?.status=== 419)
    {
      console.warn("CSRF token mismatch, refreshing...");
      refreshCsrfToken();
      const config= error.config;
      config.headers['X-CSRF-TOKEN'] = csrfToken;
      return httpClient(config);
    }

     return Promise.reject(
            error.response?.data?.message ?? "Something went wrong"
        );
  }

);

export const isAuthenticated = (): boolean => {
    return document.cookie.includes('XSRF-TOKEN=');
};

refreshCsrfToken();