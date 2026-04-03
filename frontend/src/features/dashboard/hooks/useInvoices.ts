import { useState, useEffect, useCallback } from "react";
import { invoiceApi } from "../api/invoice.api";
import type { 
  Invoice, 
  InvoiceSummary, 
  Client, 
  CreateInvoiceRequest,
  CreateClientRequest,
  InvoiceStatus 
} from "../types/invoice.types";

const statusToNumber: Record<InvoiceStatus, number> = {
  Draft: 0,
  Pending: 1,
  Paid: 2,
  Overdue: 3,
  Cancelled: 4,
};

export function useInvoices(status?: InvoiceStatus) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const statusNumber = status ? statusToNumber[status] : undefined;
      const result = await invoiceApi.getInvoices(statusNumber);
      setInvoices(result);
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  }, [status]);

  
  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);  // Now fetchInvoices changes only when status changes

  return {
    invoices,
    loading,
    error,
    refetch: fetchInvoices,
  };
}

export function useInvoiceSummary() {
  const [summary, setSummary] = useState<InvoiceSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await invoiceApi.getInvoiceSummary();
      setSummary(result);
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to load invoice summary");
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
  };
}

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await invoiceApi.getClients();
      setClients(result);
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to load clients");
    } finally {
      setLoading(false);
    }
  }, []);

  
  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return {
    clients,
    loading,
    error,
    refetch: fetchClients,
  };
}

export function useCreateInvoice() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createInvoice = useCallback(async (data: CreateInvoiceRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await invoiceApi.createInvoice(data);
      return result;
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to create invoice");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createInvoice,
    loading,
    error,
  };
}

export function useUpdateInvoiceStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = useCallback(async (id: number, status: InvoiceStatus) => {
    try {
      setLoading(true);
      setError(null);
      const statusNumber = statusToNumber[status];
      const result = await invoiceApi.updateInvoiceStatus(id, statusNumber);
      return result;
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to update invoice status");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    updateStatus,
    loading,
    error,
  };
}

export function useCreateClient() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createClient = useCallback(async (data: CreateClientRequest) => {
    try {
      setLoading(true);
      setError(null);
      const result = await invoiceApi.createClient(data);
      return result;
    } catch (error) {
      console.log("error is:", error);
      setError("Failed to create client");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createClient,
    loading,
    error,
  };
}