import type { ReactNode } from "react";

export function PageContainer({children}:{children:ReactNode}){
    return(
        <div className="mx-auto max-w-[1200px] px-8 w-full">
            {children}
        </div>
    )
}