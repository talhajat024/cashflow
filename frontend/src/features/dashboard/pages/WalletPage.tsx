import { useWalletTab } from "../hooks/useWalletTab";
import { WalletCardList }    from "../components/WalletTab/WalletCardList";
import { CardDetails }       from "../components/WalletTab/CardDetails";
import { CardLimit }         from "../components/WalletTab/CardLimit";
import { BalanceStatistics } from "../components/WalletTab/BalanceStatistics";
import { LastTransaction }   from "../components/WalletTab/LastTransaction";
import { PageSkeleton }      from "../../../shared/ui/pageskeleton";

export default function WalletPage() {
  const {
    data,
    loading,
    error,
    limitPeriod,
    setLimitPeriod,
    selectedWalletId,
    handleWalletSelect,
  } = useWalletTab();

  if (loading) return <PageSkeleton layout="dashboard" />;
  if (error)   return <div className="text-red-500 p-4">{error}</div>;
  if (!data)   return null;

  const { wallets, selectedWallet } = data;

  return (
    <div className="flex flex-col gap-6 pb-10">

      <WalletCardList
        wallets={wallets}
        selectedWalletId={selectedWalletId ?? wallets[0]?.id}
        onSelect={handleWalletSelect}
      />

      <div className="grid grid-cols-2 gap-6">
        <CardDetails details={selectedWallet.details} />
        <CardLimit
          limit={selectedWallet.limit}
          period={limitPeriod}
          onPeriodChange={setLimitPeriod}
        />
      </div>

       <div className="grid grid-cols-2 gap-6 items-start">
        <BalanceStatistics statistics={selectedWallet.statistics} />
        <LastTransaction transactions={selectedWallet.lastTransaction} />
      </div>

    </div>
  );
}
