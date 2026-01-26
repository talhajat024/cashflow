interface CashflowLogoProps{
size?:number
}

export const CashflowLogo=({size=36}:CashflowLogoProps)=>{
    return(
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cashflow logo">
            <circle cx="20" cy="20" r="20" fill="rgba(255,255,255,0.2)"/>
            <path
             d="M24.6 14.9C23.7 13.8 22.2 13.2 20.4 13.2C17.3 13.2 15 15.3 15 19.9C15 24.5 17.3 26.6 20.5 26.6C22.4 26.6 23.9 25.9 24.9 24.7"
        stroke="white"
        strokeWidth="2.4"
        strokeLinecap="round"/>
        </svg>
    )
}