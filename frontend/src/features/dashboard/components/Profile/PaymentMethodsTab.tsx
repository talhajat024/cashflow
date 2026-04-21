import { useState,useEffect } from "react";
import { Apple,Smartphone } from "lucide-react";
import { Card } from "../../../../shared/ui";
import { Button } from "../../../../shared/ui";
import type { User } from "../../../user/types/user.types";

interface PaymentMethodsTabProps{
    profile:User | null;
    onUpdate:(data:any)=> Promise<{success:boolean;message:string}>;
    onNotify:(type:'success' | 'error',message:string)=> void;
}

export function PaymentMethodsTab({profile,onUpdate,onNotify}:PaymentMethodsTabProps){

    const [loading,setLoading]=useState(false);
    const [paymentData,setPaymentData]=useState({
        currency:'USD',
        paymentMethod:'credit_card',
        allowApplePay:false,
        allowGooglePay:false,
    });

    useEffect(()=>{
        if(profile){
            setPaymentData({
                currency:profile.currency || 'USD',
                paymentMethod:profile.defaultPaymentMethod || 'credit_card',
                allowApplePay:profile.allowApplePay || false,
                allowGooglePay:profile.allowGooglePay || false,
            });
        }
    },[profile])

    const handleSubmit=async()=> {
        setLoading(true);
        const result = await onUpdate(paymentData);
        if(result.success){
            onNotify('success',result.message);
        }
        else{
            onNotify('error',result.message);
        }
        setLoading(false);
    }

    return(
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6">
                <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Payment Settings</h3>
                <p className="text-sm text-gray-500">Manage your payment preferences</p>
                </div>

                <div className="space-y-6 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select value={paymentData.currency} onChange={(e)=> setPaymentData({...paymentData,currency:e.target.value})} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                            <option value="USD">USD- US Dollar</option>
                            <option value="EUR">EUR- EURO (€)</option>
                            <option value="GBP">GBP - British Pound (£)</option>
                            <option value="PKR">PKR - Pakistani Rupee (₨)</option>
                        </select>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Default Payment Method</label>
                        <select
                            value={paymentData.paymentMethod}
                            onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="debit_card">Debit Card</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="paypal">PayPal</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Digital Wallets</label>
                        <div className="space-y-2">
                        <PaymentToggle
                                icon={<Apple size={20} />}
                                label="Apple Pay"
                                checked={paymentData.allowApplePay}
                                onChange={(checked) => setPaymentData({ ...paymentData, allowApplePay: checked })}
                            />
                            <PaymentToggle
                                icon={<Smartphone size={20} />}
                                label="Google Pay"
                                checked={paymentData.allowGooglePay}
                                onChange={(checked) => setPaymentData({ ...paymentData, allowGooglePay: checked })}
                            />
                        </div>
                    </div>

                    <Button onClick={handleSubmit} disabled={loading} className="rounded-xl w-full md:w-auto">
                        {loading ? 'Saving...' : 'Save Payment Settings'}
                    </Button>

                </div>
            </div>
        </Card>
    );    
}

// Reuseable payment toggle component
function PaymentToggle({icon,label,checked,onChange}:{
    icon:React.ReactNode;
    label:string;
    checked:boolean;
    onChange:(checked:boolean)=> void;
}){
    return(
        <label className="flex items-center justify-between p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-all">
            <div className="flex items-center gap-3">
                {icon}
                <span className="text-sm">{label}</span>
            </div>
            <input type="checkbox" checked={checked} onChange={(e)=> onChange(e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"/>
        </label>
    )
}