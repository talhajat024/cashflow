import { useState } from "react";
import Modal from "../../../../shared/ui/modal/Modal";
import { Button } from "../../../../shared/ui";
import type { Client,CreateInvoiceRequest } from "../../types/invoice.types";

interface Props{
    isOpen: boolean;
    onClose :()=> void;
    clients:Client[];
    onCreate:(data:CreateInvoiceRequest)=> Promise<void>;
}

export function CreateInvoiceModal({isOpen,onClose,clients,onCreate}:Props){
    
    const [formData,setFormData]=useState<CreateInvoiceRequest>({
        clientId:0,
        issueDate:new Date().toISOString().split('T')[0],
        dueDate:"",
        amount:0,
        description:""
    });

    const [loading,setLoading]=useState(false);

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        if(formData.clientId === 0 )
        {
            alert("please select a client");
            return;
        }
        if(!formData.dueDate){
            alert("please enter a due date");
            return;
        }
        if(formData.amount <= 0){
            alert("please enter a valid amount");
            return;
        }
        setLoading(true);
        try{
            await onCreate(formData);
            onClose();
            setFormData({
                clientId:0,
                issueDate:new Date().toISOString().split('T')[0],
                dueDate:"",
                amount:0,
                description:""
            })
        } catch (error) {
            console.error("Failed to create invoice",error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <Modal isOpen={isOpen} onClose={onClose} title="Create Invoice">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client <span className="text-red-500">*</span>
                    </label>
                    <select required value={formData.clientId} onChange={(e)=> setFormData({...formData,clientId:Number(e.target.value)})}  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value={0}>Select a client</option>
                        {clients.map((client)=>(
                            <option key={client.id} value={client.id}>
                                {client.name} {client.company ? `(${client.company})` : ""}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Issue Date
                    </label>
                    <input type="date" value={formData.issueDate} onChange={(e)=> setFormData({...formData,issueDate:e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Due Date <span className="text-red-500">*</span>
                    </label>
                    <input type="date" required value={formData.dueDate} onChange={(e)=> setFormData({...formData,dueDate:e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <input type="number" required step="0.01" min="0" value={formData.amount} onChange={(e)=> setFormData({...formData,amount:Number(e.target.value)})} placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={3} value={formData.description} onChange={(e)=> setFormData({...formData,description:e.target.value})}
                        placeholder="Optional description..."
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>

                <div className="flex gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                   Cancel
                 </Button>
                 <Button type="submit" variant="primary" loading={loading} className="flex-1">
                   Create Invoice
                 </Button>
                </div>
            </form>
        </Modal>
    );
}