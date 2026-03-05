import React, { useState,useCallback } from "react";
import { useAuth } from "./useAuth";

interface SignupFormState{
    name:string;
    email:string;
    password:string;
}

interface SignupFormErrors{
    name?:string;
    email?:string;
    password?:string;
    terms?:string;
}

interface UseSignupFormReturn {
    formData:SignupFormState;
    errors:SignupFormErrors;
    localError:string | null;
    isLoading:boolean;
    agreedToTerms:boolean;
    setAgreedToTerms:(val:boolean)=> void;
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=> void;
    handleSubmit:(e:React.FormEvent)=> Promise<void>;
    resetForm:()=> void;
}

export const useSignUpForm=():UseSignupFormReturn=>{

    const [formData,setFormData]=useState<SignupFormState>({
        name:'',
        email:'',
        password:'',
    }); 

    const [errors,setErrors]=useState<SignupFormErrors>({});
    const [localError,setLocalError]=useState<string | null>(null);
    const [agreedToTerms,setAgreedToTerms]=useState(false);

    const {signup,isLoading,error:authError }=useAuth();

    const validateForm=useCallback(():boolean=>{
        const newErrors:SignupFormErrors={};
        if(!formData.name.trim())
        {
            newErrors.name="Name is required";
        }
        else if(formData.name.trim().length < 2)
        {
            newErrors.name="Name must be atleast 2 characters";
        }

        if(!formData.email)
        {
            newErrors.email="Email is required";
        }
        else if(!/\S+@\S+\.\S+/.test(formData.email))
        {
            newErrors.email="Email is Invalid";
        }
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        }

        if (!agreedToTerms) {
          newErrors.terms = 'You must agree to the Terms and Privacy Policy';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    },[formData,agreedToTerms]);

    const handleChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{

        const {name,value}=e.target;
        setFormData(prev=> ({...prev,[name]:value}));

        if(errors[name as keyof SignupFormErrors]){
            setErrors(prev=> ({...prev,[name]:undefined}));
        }
        if(localError) setLocalError(null);
    },[errors,localError]);

    const handleSubmit=useCallback(async(e:React.FormEvent)=>{
        e.preventDefault();
        setLocalError(null);

        if(!validateForm()) return;

        try{
            await signup({
                name:formData.name,
                email:formData.email,
                password:formData.password,
                confirmPassword:formData.password,
            });
        }
        catch(err:any)
        {
            setLocalError(err.message || "Signup failed. Please try again");
        }
    },[formData,signup,validateForm]);

    const resetForm=useCallback(()=>{
        setFormData({name:'',email:'',password:''});
        setErrors({});
        setLocalError(null);
        setAgreedToTerms(false);
    },[]);

    const displayError=localError || authError;

    return {
        formData,
        errors,
        localError:displayError,
        isLoading,
        agreedToTerms,
        setAgreedToTerms,
        handleChange,
        handleSubmit,
        resetForm,
    };
} 