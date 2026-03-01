import React, { useState,useCallback } from "react";
import { useAuth } from "./useAuth";

interface LoginFormState{
    email:string;
    password:string;
}

interface UseLoginFormReturn{
    formData:LoginFormState,
    errors:Partial<LoginFormState>;
    localError:string | null;
    isLoading:boolean;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=> void;
    handleSubmit:(e:React.FormEvent)=> Promise<void>;
    resetForm:()=> void;
}

export const useLoginForm=():UseLoginFormReturn=>{
    const [formData,setFormData]=useState<LoginFormState>({
        email:'',
        password:''
    });
    const [errors,setErrors]=useState<Partial<LoginFormState>>({});
    const [localError,setLocalError]=useState<string| null>(null);

    const {login,isLoading,error:authError}=useAuth();

    const validateForm=useCallback(():boolean=>{
        const newErrors:Partial<LoginFormState>={};

        if(!formData.email)
        {
            newErrors.email= "Email is required.";
        }
        else if(!/\S+@\S+\.\S+/.test(formData.email))
        {
            newErrors.email= 'Email is invalid';
        }
        if(!formData.password)
        {
            newErrors.password= "Password is required";
        }
        else if(formData.password.length < 6)
        {
            newErrors.password = "Password must be atleast 6 characters long";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length===0;
    },[formData]);

    const handleChange= useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;
        setFormData(prev=> ({...prev,[name]:value}));

        // clear field specific error when user types
        if(errors[name as keyof LoginFormState])
        {
            setErrors(prev=> ({...prev,[name]:undefined}));
        }

        if(localError)
        {
            setLocalError(null);
        }
    },[errors,localError])

    const handleSubmit=useCallback(async (e:React.FormEvent)=>{
        e.preventDefault();
        setLocalError(null);

        if(!validateForm())
        {
            return;
        }  
        
        try{
            await login(formData);
        }
        catch(err:any)
        {
            setLocalError(err.message || 'Login failed. Please Try Again');
        }
    },[formData,login,validateForm]);

    const resetForm=useCallback(()=>{
        setFormData({email:'',password:''});
        setErrors({});
        setLocalError(null);
    },[])

    const displayError=localError || authError;
    return{
        formData,
        errors,
        localError:displayError,
        isLoading,
        handleChange,
        handleSubmit,
        resetForm,
    };
};