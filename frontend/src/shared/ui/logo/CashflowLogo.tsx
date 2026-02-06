interface CashflowLogoProps {
  size?: number;
}

export const CashflowLogo = ({ size = 24 }: CashflowLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="13 10 14 20" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cashflow logo"
    >
      {/* Base white C */}
      <path
        d="M26 14
           C24.6 12.5 22.6 11.8 20.3 11.8
           C15.9 11.8 13 14.9 13 20
           C13 25.1 15.9 28.2 20.3 28.2
           C22.6 28.2 24.6 27.4 26 25.8"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cyan top accent */}
      <path
        d="M26 14
           C24.6 12.5 22.6 11.8 20.3 11.8"
        stroke="#22D3EE"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Cyan bottom accent */}
      <path
        d="M20.3 28.2
           C22.6 28.2 24.6 27.4 26 25.8"
        stroke="#22D3EE"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
