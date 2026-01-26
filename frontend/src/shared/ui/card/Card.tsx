import type { ReactNode } from 'react';

interface BaseProps {
    children:ReactNode;
    className?:string;
}

export const Card = ({children,className = ''}:BaseProps)=>(
    <div className={`bg-card rounded-xl border border-gray-200 shadow-md ${className}`}>
        {children}
    </div>
)

export const CardHeader = ({children,className = ''}:BaseProps)=>(
    <div className={`px-4 py-2 border-b border-gray-100 ${className}`}>
        {children}
    </div>
);

export const CardContent = ({children,className =''}:BaseProps)=>(
    <div className={`p-3 ${className}`}>{children}</div>
);

export const CardFooter = ({children,className= ''}:BaseProps)=>(
    <div className={`px-4 py-3 border-t border-gray-100 ${className}`}>
        {children}
    </div>
);