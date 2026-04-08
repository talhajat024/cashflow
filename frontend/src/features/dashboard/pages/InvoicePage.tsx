import { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { useInvoices, useInvoiceSummary, useClients, useCreateInvoice } from "../hooks/useInvoices";
import { InvoiceSummaryCards } from "../components/Invoice/InvoiceSummaryCards";
import { InvoiceTable } from "../components/Invoice/InvoiceTable";
import { CreateInvoiceModal } from "../components/Invoice/CreateInvoiceModal";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";

export default function InvoicePage() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  
  const { invoices, loading: invoicesLoading, refetch: refetchInvoices } = useInvoices();
  const { summary, loading: summaryLoading, refetch: refetchSummary } = useInvoiceSummary();
  const { clients, loading: clientsLoading } = useClients();
  const { createInvoice } = useCreateInvoice();

  const handleCreateInvoice = async (data: any) => {
    await createInvoice(data);
    refetchInvoices();
    refetchSummary();
  };

  if (invoicesLoading || summaryLoading || clientsLoading) {
    return <PageSkeleton layout="dashboard" />;
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Summary Cards - at the TOP (as per original UI) */}
      {summary && (
        <InvoiceSummaryCards
          totalClients={summary.totalClients}
          totalInvoices={summary.totalInvoices}
          totalPaidAmount={summary.totalPaidAmount}
        />
      )}

      {/* Header - Overview section BELOW summary cards */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-gray-900">Overview</h2>
        <div className="flex items-center gap-3">
          {/* Last 30 Days filter */}
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white cursor-pointer">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-[13px] font-medium text-gray-700">Last 30 Days</span>
          </div>
          {/* Create Invoice button */}
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={14} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <InvoiceTable invoices={invoices || []} />

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        clients={clients || []}
        onCreate={handleCreateInvoice}
      />
    </div>
  );
}