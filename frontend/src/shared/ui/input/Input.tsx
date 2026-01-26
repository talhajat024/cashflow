import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({className ='',...props},ref)=>{
        return(
            <input 
            ref={ref}
            className={`w-full rounded-lg px-4 py-2 text-sm
                bg-white border border-gray-200
                text-textPrimary placeholder:text-textSecondary
                focus:outline-none focus:ring-2 focus:ring-primary/30 ${className}`} {...props} />
        )
})

Input.displayName='Input'