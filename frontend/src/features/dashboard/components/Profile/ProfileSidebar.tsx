import { User as UserIcon,Lock,CreditCard,Trash2,ChevronRight } from "lucide-react";
import { Card } from "../../../../shared/ui";
import { AvatarSection } from './AvatarSection';
import type { TabType } from '../../pages/ProfilePage';
import type { User } from "../../../user/types/user.types";
import { Button } from "../../../../shared/ui";

interface ProfileSidebarProps{
    profile:User | null;
    activeTab:TabType;
    onTabChange:(tab:TabType)=> void;
    onDeleteClick:()=>void;
}

const TABS:{id:TabType;label:string;icon:React.ComponentType<{size?:number}>}[]=[
    {id:'profile',label:'Profile information',icon:UserIcon},
    {id:'security',label:'Password & Security',icon:Lock},
    {id:'payments',label:'Payment Methods',icon:CreditCard},
];

export function ProfileSidebar({profile,activeTab,onTabChange,onDeleteClick}:ProfileSidebarProps){
    return(
        <Card className="lg:col-span-1 sticky top-6 border-0 shadow-xl rounded-2xl overflow-hidden">
            <div className="p-6">
                <AvatarSection profile={profile}/>
                <nav className="space-y-1 mt-6">
                    {TABS.map((tab)=>(
                        <button
                        key={tab.id}
                        onClick={()=> onTabChange(tab.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                activeTab === tab.id
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}>
                        <div className="flex items-center gap-3">
                            <tab.icon size={18} />
                            <span className="text-sm font-medium">{tab.label}</span>
                        </div>
                        <ChevronRight size={16} className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-0'} transition-opacity`}/>
                        </button>
                    ))}
                </nav>

                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                    onClick={onDeleteClick}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                        <span className="text-sm font-medium">Delete Account</span>
                    </button>
                </div>
            </div>
        </Card>
    );
}
