import type { ReactNode } from "react";
import { EmptyState } from "./EmptyState";
import { ErrorState } from "./ErrorState";
import { PageSkeleton } from "../skeleton/PageSkeleton";


interface PageStateProps{
    loading?:boolean;
    loadingLayout?:'dashboard' | 'list' | 'details' | 'table';

    error?:string|null;
    onRetry?:()=>void;

    isEmpty?:boolean;
    emptyTitle?:string;
    emptyDescription?:string;
    emptyActionLabel?:string;
    onEmptyAction?:()=> void;

    children:ReactNode;
}

export const PageState=({
    loading,
    loadingLayout="dashboard",

    error,
    onRetry,

    isEmpty,
    emptyTitle="No data available",
    emptyDescription,
    emptyActionLabel,
    onEmptyAction,
    
    children
}:PageStateProps)=>{
    if(loading)
    {
        console.log("showing skeletons");
        return <PageSkeleton layout={loadingLayout}/>;
    }
    if(error)
    {
        return <ErrorState message={error} onRetry={onRetry}/>
    }
    if(isEmpty)
    {
        return(
            <EmptyState
            title={emptyTitle}
            description={emptyDescription}
            actionLabel={emptyActionLabel}
            onAction={onEmptyAction}/>
        );
    }
    return <>{children}</>;
};

