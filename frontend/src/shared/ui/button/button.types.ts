import type React from "react";

export type ButtonVariant= 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>
{
    children:React.ReactNode;
    variant?:ButtonVariant;
    size?:ButtonSize;
    loading?:boolean;
    fullWidth?:boolean;
    icon?:React.ReactNode;
    iconPosition?:'left' | 'right';
}