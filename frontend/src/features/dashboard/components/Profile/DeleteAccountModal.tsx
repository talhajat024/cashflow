import { AlertCircle } from "lucide-react";
import Modal from "../../../../shared/ui/modal/Modal";
import { Button } from "../../../../shared/ui";

interface DeleteAccountModalProps{
    isOpen:boolean;
    onClose:()=> void;
    onConfirm:()=> void;
}

export function DeleteAccountModal({isOpen,onClose,onConfirm}:DeleteAccountModalProps){
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                    <AlertCircle className="text-red-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently lost.
            </p>
            <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose} className="rounded-xl">
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} className="rounded-xl">
                    Delete Account
                </Button>
            </div>
        </div>
    </Modal>
    )
}