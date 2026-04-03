export type InvoiceStatus = 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Client{
    id:number;
    name:string;
    email:string;
    company?:string;
    phone?:string;
    address?:string;
    totalInvoices?:number;
    totalAmount?:number;
}

export interface Invoice {
    id:number;
    invoiceNumber:string;
    clientName:string;
    companyName?:string;
    issueDate:string;
    dueDate:string;
    amount:number;
    status:InvoiceStatus;
    description?:string;
    pdfUrl?:string;
}

export interface InvoiceSummary {
    totalClients: number;
  totalInvoices: number;
  totalPaidAmount: number; 
}

export interface CreateInvoiceRequest
{
    clientId:number;
    issueDate:string;
    dueDate:string;
    amount:number;
    description?:string;
}

export interface CreateClientRequest
{
    name:string;
    email:string;
    company?:string;
    phone?:string;
    address?:string;
}

// Utility types
export type UpdateInvoiceRequest = Partial<CreateInvoiceRequest> & {
  id: number;
  status?: InvoiceStatus;
};

export type InvoiceFilterParams = {
  status?: InvoiceStatus;
  startDate?: string;
  endDate?: string;
  clientId?: number;
};
