import { useRef } from "react";
import { Camera } from "lucide-react";
import { useProfile } from "../../../user/hooks/useProfile";
import type { User } from "../../../user/types/user.types";

interface AvatarSectionProps{
    profile:User | null;
}

export function AvatarSection({profile}:AvatarSectionProps){
    const {updateAvatar}=useProfile();
    const fileInputRef= useRef<HTMLInputElement>(null);

    const handleAvatarClick=()=>{
        fileInputRef.current?.click();
    };

    const handleFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            const previewUrl= URL.createObjectURL(file);
            await updateAvatar(previewUrl);
        }
    };

    const getInitials=()=>{
        const first= profile?.firstName?.[0] || '';
        const last = profile?.lastName?.[0] || '';
        return `${first}${last}`.toUpperCase();
    }

    return(
        <div className="text-center mb-6">
            <input ref={fileInputRef}
            type="file"
            accept="image/*" 
            onChange={handleFileChange}
            className="hidden"/>

            <div className="relative inline-block group">
                <div
                onClick={handleAvatarClick}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto shadow-lg cursor-pointer">
                    {profile?.avatar ? (
                         <img 
                            src={profile.avatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                        />
                    ):(
                        getInitials()
                    )}
                </div>

                <button
                onClick={handleAvatarClick}
                className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 text-white hover:bg-indigo-700 transition-all shadow-lg">
                        <Camera size={14} />
                </button>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-gray-900">
                {profile?.firstName} {profile?.lastName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">{profile?.role}</p>
        </div>
    );
}