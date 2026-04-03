import { useState } from "react";
import Modal from "../../../../shared/ui/modal/Modal";
import { Button } from "../../../../shared/ui";
import type { CreateClientRequest } from "../../types/invoice.types";

interface Props{
    isOpen:boolean;
    onClose:()=> void;
    onCreate:(data:CreateClientRequest)=> Promise<void>;
}

export function CreateClientModal({isOpen,onClose,onCreate}:Props){
    const [formData,setFormData]=useState<CreateClientRequest>({
        name:"",
        email:"",
        company:"",
        phone:"",
        address:""
    });

    const [loading,setLoading]=useState(false);

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault();
        if(!formData.name)
        {
            alert("Please enter client name");
            return;
        }
        if(!formData.email)
        {
            alert("Please enter client email");
            return;
        }
        setLoading(true);
        try{
            await onCreate(formData);
            onClose();
            setFormData({
                name:"",
                email:"",
                company:"",
                phone:"",
                address:""
            });
        }
        catch(error)
        {
            console.error("Failed to create client:",error);
        }
        finally{
            setLoading(false);
        }
    };

        return(
            <Modal isOpen={isOpen} onClose={onClose} title="Add Client">
                <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="client@example.com"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="Company Name"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 234 567 8900"
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Client address..."
            className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading} className="flex-1">
            Add Client
          </Button>
        </div>
      </form>
            </Modal>
        );
}