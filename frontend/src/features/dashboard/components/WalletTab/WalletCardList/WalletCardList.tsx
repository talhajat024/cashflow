import { WalletCard } from "../WalletCard/WalletCard";
import { styles } from "./WalletCardList.styles";
import type { Wallet } from "../../../types/wallet.types";

type WalletCardListProps={
    wallets:Wallet[];
    selectedWalletId:string | undefined;
    onSelect:(id:string)=> void;
}

export function WalletCardList({wallets,selectedWalletId,onSelect}:WalletCardListProps){
    return(
        <div className={styles.container()}>
            <div className={styles.inner()}>
                {wallets.map((wallet,index)=>(
                    <WalletCard
                    key={wallet.id}
                    wallet={wallet}
                    index={index}
                    isSelected={selectedWalletId === wallet.id}
                    onSelect={onSelect}/>
                ))}
            </div>
        </div>
    );
}


