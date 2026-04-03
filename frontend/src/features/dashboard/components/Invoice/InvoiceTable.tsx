import {  Eye } from "lucide-react";
import { Card,CardContent } from "../../../../shared/ui";
import { Badge } from "../../../../shared/ui/badge/Badge";
import type { Invoice } from "../../types/invoice.types";

interface Props{
    invoices:Invoice[];
    loading?:boolean;
    onViewInvoice?:(invoice:Invoice)=> void;
}

export function InvoiceTable({invoices,loading,onViewInvoice}:Props){
    if(loading){
        return(
             <Card className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
        );
    }

    if(invoices.length === 0){
          return (
      <Card className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
        <CardContent className="p-12 text-center">
          <p className="text-gray-400">No invoices found. Create your first invoice!</p>
        </CardContent>
      </Card>
    );
    }

     const getBadgeIntent = (status: string) => {
    switch (status.toLowerCase()) {
      case 'draft': return 'draft';
      case 'pending': return 'pending';
      case 'paid': return 'paid';
      case 'overdue': return 'overdue';
      case 'cancelled': return 'cancelled';
      default: return 'draft';
    }
  };

  return (
    <Card className="border-0 shadow-[0_6px_20px_rgba(16,24,40,0.06)]">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-100">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Invoice #</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Client</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Issue Date</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Due Date</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Amount</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-xs font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {invoice.invoiceNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invoice.clientName}</p>
                      {invoice.companyName && (
                        <p className="text-xs text-gray-400">{invoice.companyName}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(invoice.issueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(invoice.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge intent={getBadgeIntent(invoice.status)}>
                      {invoice.status.toUpperCase()}
                    </Badge>
                  </td>
                 <td className="px-6 py-4">
                  <Badge intent={getBadgeIntent(invoice.status)}>
                    {invoice.status.toUpperCase()}
                  </Badge>
                </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </CardContent>
    </Card>
  );
}
