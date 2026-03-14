import { styles } from "./WalletCard.styles";
import type { Wallet } from "../../../types/wallet.types";

// WalletCard.tsx
const CARD_GRADIENTS = [
  `radial-gradient(circle at 85% 85%, rgba(34, 211, 238, 0.5) 0%, transparent 50%),
   linear-gradient(to right, #89C4FF 0%, #4B8EF5 50%, #3B6FE8 100%)`,

  `radial-gradient(circle at 85% 85%, rgba(167, 139, 250, 0.6) 0%, transparent 50%),
   linear-gradient(to right, #89C4FF 0%, #4B8EF5 50%, #3B6FE8 100%)`,

  `radial-gradient(circle at 85% 85%, rgba(251, 146, 60, 0.55) 0%, transparent 50%),
   linear-gradient(to right, #89C4FF 0%, #4B8EF5 50%, #3B6FE8 100%)`,
];

type WalletCardProps={
    wallet:Wallet;
    index:number;
    isSelected:boolean;
    onSelect:(id:string)=> void;
}

export function WalletCard({wallet,index,isSelected,onSelect}:WalletCardProps)
{
    const gradient= CARD_GRADIENTS[index % CARD_GRADIENTS.length];

    return (
        <div 
        className={styles.container()}
        style={{background:gradient}}
        onClick={()=> onSelect(wallet.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e)=> e.key === 'Enter' && onSelect(wallet.id)}>

            <div
        className={styles.gradientSection()}
        style={{ background: gradient }}
      >
            {/* Top Row */}
            <div className={styles.topRow()}>
                <div>
                    <p className={styles.label()}>Name</p>
                    <p className={styles.name()}>{wallet.name}</p>
                </div>

                <div>
                <p className={styles.label()}>Number</p>
                <p className={styles.number()}>{wallet.number}</p>
                </div>
            </div>
            </div>

            {/* Bottom Row */}
            <div className={styles.whiteSection()}>
                <div>
                    <p className={styles.balanceLabel()}>Balance</p>
                    <p className={styles.balanceAmount()}>
                        ${wallet.balance.toLocaleString("en-US",{minimumFractionDigits:2})}
                    </p>
                </div>

                <div className={styles.mastercardWrapper()}>
                    <div className={styles.circle1()}/>
                    <div className={styles.circle2()}/>
                </div>
            </div>
        </div>
    )
}

