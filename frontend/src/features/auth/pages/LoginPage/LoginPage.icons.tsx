// features/auth/pages/LoginPage/LoginPage.icons.tsx

export const EyeIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const EyeOffIcon = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export const Sparkle = ({ x, y, size = 14 }: { x: number; y: number; size?: number }) => (
  <div style={{ position: 'absolute', left: x, top: y }}>
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5L8 0Z" fill="white" fillOpacity="0.9" />
    </svg>
  </div>
);

export const CreditCard = ({
  rotate,
  translateX,
  translateY,
  opacity = 1,
}: {
  rotate: number;
  translateX: number;
  translateY: number;
  opacity?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      transform: `rotate(${rotate}deg) translate(${translateX}px, ${translateY}px)`,
      opacity,
    }}
  >
    <svg width="200" height="128" viewBox="0 0 200 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="200" height="128" rx="14" fill="white" fillOpacity="0.25" />
      <rect width="200" height="128" rx="14" fill="url(#cardGrad)" fillOpacity="0.3" />
      {/* Chip */}
      <rect x="20" y="44" width="28" height="22" rx="4" fill="white" fillOpacity="0.55" />
      <line x1="20" y1="55" x2="48" y2="55" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
      <line x1="34" y1="44" x2="34" y2="66" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
      {/* Contactless */}
      <path d="M162 52 Q170 60 162 68" stroke="white" strokeOpacity="0.7" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M157 55 Q163 60 157 65" stroke="white" strokeOpacity="0.7" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Shimmer */}
      <rect x="0" y="0" width="200" height="128" rx="14" fill="url(#shimmer)" fillOpacity="0.15" />
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="200" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="shimmer" x1="200" y1="0" x2="0" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const DiagonalStripes = () => (
  <svg width="100%" height="100%" viewBox="0 0 480 900" preserveAspectRatio="xMidYMid slice" fill="none">
    <rect x="-50" y="150" width="600" height="80" fill="white" fillOpacity="0.07" transform="rotate(-35 240 450)" />
    <rect x="-50" y="280" width="600" height="50" fill="white" fillOpacity="0.05" transform="rotate(-35 240 450)" />
    <rect x="-50" y="370" width="600" height="90" fill="white" fillOpacity="0.06" transform="rotate(-35 240 450)" />
    <rect x="-50" y="480" width="600" height="40" fill="white" fillOpacity="0.04" transform="rotate(-35 240 450)" />
    <rect x="-50" y="560" width="600" height="70" fill="white" fillOpacity="0.05" transform="rotate(-35 240 450)" />
  </svg>
);