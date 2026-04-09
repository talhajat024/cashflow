import { MoreHorizontal, Users, FileText, DollarSign } from "lucide-react";
import { Card, CardContent } from "../../../../shared/ui";
import { MiniChart } from "../../../../shared/ui/charts/MiniChart";

interface Props {
  totalClients: number;
  totalInvoices: number;
  totalPaidAmount: number;
  loading?: boolean;
}

export function InvoiceSummaryCards({ 
  totalClients, 
  totalInvoices, 
  totalPaidAmount,
  loading 
}: Props) {
  
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
            <CardContent className="p-5">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "CLIENT",
      value: totalClients,
      icon: Users,
      chartData: [totalClients, totalClients * 1.2, totalClients * 0.8],
    },
    {
      title: "INVOICES",
      value: totalInvoices,
      icon: FileText,
      chartData: [totalInvoices, totalInvoices * 1.3, totalInvoices * 0.9],
    },
    {
      title: "PAID",
      value: `$${totalPaidAmount.toLocaleString()}`,
      icon: DollarSign,
      chartData: [totalPaidAmount, totalPaidAmount * 1.4, totalPaidAmount * 0.7],
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)] overflow-hidden">
          <CardContent className="p-5">
            {/* Header: Icon + Label + Three dots in same row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <card.icon size={16} className="text-gray-500" />
                </div>
                <span className="text-[13px] font-medium text-gray-500">{card.title}</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>

            {/* Value + Mini Chart in the same row */}
            <div className="flex items-end justify-between">
              <span className="text-[32px] font-bold text-gray-900 leading-none">{card.value}</span>
              <div className="w-[80px] h-[64px]">
              <MiniChart data={card.chartData as [number, number, number]} />
            </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}