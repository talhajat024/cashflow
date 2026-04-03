import { useState } from "react";
import { Plus, Calendar, UserPlus } from "lucide-react";
import { useInvoices, useInvoiceSummary, useClients, useCreateInvoice, useCreateClient } from "../hooks/useInvoices";
import { InvoiceSummaryCards } from "../components/Invoice/InvoiceSummaryCards";
import { InvoiceTable } from "../components/Invoice/InvoiceTable";
import { CreateInvoiceModal } from "../components/Invoice/CreateInvoiceModal";
import { CreateClientModal } from "../components/Invoice/CreateClientModal";
import { PageSkeleton } from "../../../shared/ui/pageskeleton";

export default function InvoicePage() {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  
  const { invoices, loading: invoicesLoading, refetch: refetchInvoices } = useInvoices();
  const { summary, loading: summaryLoading, refetch: refetchSummary } = useInvoiceSummary();
  const { clients, loading: clientsLoading, refetch: refetchClients } = useClients();
  const { createInvoice, loading: createInvoiceLoading } = useCreateInvoice();
  const { createClient, loading: createClientLoading } = useCreateClient();

  const handleCreateInvoice = async (data: any) => {
    await createInvoice(data);
    refetchInvoices();
    refetchSummary();
  };

  const handleCreateClient = async (data: any) => {
    await createClient(data);
    refetchClients();
  };

  if (invoicesLoading || summaryLoading || clientsLoading) {
    return <PageSkeleton layout="dashboard" />;
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[22px] font-bold text-gray-900">Invoices</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-white">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-[13px] font-medium text-gray-700">Last 30 Days</span>
          </div>
          <button
            onClick={() => setIsClientModalOpen(true)}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <UserPlus size={14} />
            Add Client
          </button>
          <button
            onClick={() => setIsInvoiceModalOpen(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            <Plus size={14} />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Summary Cards - 3 cards */}
      {summary && (
        <InvoiceSummaryCards
          totalClients={summary.totalClients}
          totalInvoices={summary.totalInvoices}
          totalPaidAmount={summary.totalPaidAmount}
        />
      )}

      {/* Invoice Table */}
      <InvoiceTable invoices={invoices || []} />

      {/* Modals */}
      <CreateInvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        clients={clients || []}
        onCreate={handleCreateInvoice}
      />

      <CreateClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onCreate={handleCreateClient}
      />
    </div>
  );
}