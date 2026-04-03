import { Users, FileText, DollarSign } from "lucide-react";
import { Card, CardContent } from "../../../../shared/ui";

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
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "INVOICES",
      value: totalInvoices,
      icon: FileText,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
    {
      title: "PAID",
      value: `$${totalPaidAmount.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card key={card.title} className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-gray-500">{card.title}</p>
                <p className="text-[28px] font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-full ${card.bg} flex items-center justify-center`}>
                <card.icon size={18} className={card.color} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}