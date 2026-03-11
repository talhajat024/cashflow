import { walletCard } from "./WalletCard.styles";
import type { Wallet } from "../../../types/wallet.types";

const CARD_GRADIENTS=[
    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
  "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
  "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
];

type WalletCardProps={
    wallet:Wallet;
    index:number;
    isSelected:boolean;
    onSelect:(id:string)=> void;
}

export function WalletCard({wallet,index,isSelected,onSelect}:WalletCardProps)
{
    const s = walletCard({selected:isSelected});
    const gradient= CARD_GRADIENTS[index % CARD_GRADIENTS.length];

    return (
        <div className={s.container()}
        style={{background:gradient}}
        onClick={()=> onSelect(wallet.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e)=> e.key === 'Enter' && onSelect(wallet.id)}
        aria-pressed={isSelected}>
            {/* Top Row */}
            <div className={s.topRow()}>
                <div>
                    <p className={s.label()}>Name</p>
                    <p className={s.name()}>{wallet.name}</p>
                </div>

                <div className="text-right">
                <p className={s.label()}>Number</p>
                <p className={s.number()}>{wallet.number}</p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className={s.bottomRow()}>
                <div>
                    <p className={s.balanceLabel()}>Balance</p>
                    <p className={s.balanceAmount()}>
                        ${wallet.balance.toLocaleString("en-US",{minimumFractionDigits:2})}
                    </p>
                </div>

                <div className={s.mastercardWrapper()}>
                    <div className={s.circle1()}/>
                    <div className={s.circle2()}/>
                </div>
            </div>
        </div>
    )
}

