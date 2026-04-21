import { useState,useEffect } from "react";
import { Save,X } from "lucide-react";
import { Card } from "../../../../shared/ui";
import { Button } from "../../../../shared/ui";
import { Input } from "../../../../shared/ui";
import type { User } from "../../../user/types/user.types";

interface ProfileInfoTabProps{
    profile:User | null;
    onUpdate:(data:Partial<User>)=> Promise<{success:boolean;message:string}>;
    onNotify:(type:'success'|'error' ,message:string)=> void;
}

export function ProfileInfoTab({profile,onUpdate,onNotify}:ProfileInfoTabProps){
    const [isEditing,setIsEditing]=useState(false);
    const [saving,setSaving]=useState(false);
    const [formData,setFormData]=useState({
        firstName:'',
        lastName:'',
        phoneNumber:'',
        city:'',
        state:'',
        zipCode:'',
        country:'',
        fullAddress:'',
    });

    useEffect(()=>{
        if(profile){
            setFormData({
                firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                phoneNumber: profile.phoneNumber || '',
                city: profile.city || '',
                state: profile.state || '',
                zipCode: profile.zipCode || '',
                country: profile.country || '',
                fullAddress: profile.fullAddress || '',
            });
        }
    },[profile])

    const handleSubmit=async()=>{
        setSaving(true);
        const result = await onUpdate(formData);
        if(result.success){
            setIsEditing(false);
            onNotify('success',result.message);
        }
        else{
            onNotify('error',result.message);
        }
        setSaving(false);
    }

    const handleCancel=()=>{
        setIsEditing(false);
        if(profile){
            setFormData({
                 firstName: profile.firstName || '',
                lastName: profile.lastName || '',
                phoneNumber: profile.phoneNumber || '',
                city: profile.city || '',
                state: profile.state || '',
                zipCode: profile.zipCode || '',
                country: profile.country || '',
                fullAddress: profile.fullAddress || '',
            });
        }
    };

    return(
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                         <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                    {!isEditing ? (
                        <Button onClick={()=> setIsEditing(true)} variant="outline" className="rounded-xl">Edit Profile</Button>
                    ):(
                         <div className="flex gap-2">
                            <Button onClick={handleCancel} variant="ghost" className="rounded-xl" disabled={saving}>
                                <X size={16} className="mr-1" /> Cancel
                            </Button>
                            <Button onClick={handleSubmit} disabled={saving} className="rounded-xl">
                                <Save size={16} className="mr-1" /> {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(val) => setFormData({ ...formData, firstName: val })}
                        disabled={!isEditing}
                        placeholder="Enter first name"
                    />
                    <FormField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(val) => setFormData({ ...formData, lastName: val })}
                        disabled={!isEditing}
                        placeholder="Enter last name"
                    /> 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input value={profile?.email || ''} disabled className="bg-gray-50 rounded-xl" />
                    </div>

                    <FormField
                        label="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(val) => setFormData({ ...formData, phoneNumber: val })}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                    />
                    <FormField
                        label="City"
                        value={formData.city}
                        onChange={(val) => setFormData({ ...formData, city: val })}
                        disabled={!isEditing}
                        placeholder="Enter city"
                    />
                    <FormField
                        label="State"
                        value={formData.state}
                        onChange={(val) => setFormData({ ...formData, state: val })}
                        disabled={!isEditing}
                        placeholder="Enter state"
                    />
                    <FormField
                        label="Zip Code"
                        value={formData.zipCode}
                        onChange={(val) => setFormData({ ...formData, zipCode: val })}
                        disabled={!isEditing}
                        placeholder="Enter zip code"
                    />
                    <FormField
                        label="Country"
                        value={formData.country}
                        onChange={(val) => setFormData({ ...formData, country: val })}
                        disabled={!isEditing}
                        placeholder="Enter country"
                    />

                    <div className="md:col-span-2">
                        <FormField
                            label="Full Address"
                            value={formData.fullAddress}
                            onChange={(val) => setFormData({ ...formData, fullAddress: val })}
                            disabled={!isEditing}
                            placeholder="Enter full address"
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}


// Reuseable form field component
function FormField({label,value,onChange,disabled,placeholder}:{label:string;value:string;onChange:(val:string)=> void;disabled:boolean;placeholder:string;})
{
    return(
        <div> 
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder}
                className="rounded-xl"
            /> 
        </div>
    )
}
