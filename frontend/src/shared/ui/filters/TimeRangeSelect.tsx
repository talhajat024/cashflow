import { Calendar } from "lucide-react";

export function TimeRangeSelect({label}:{label:string}){
    return(
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
            {label}
            <Calendar size={16} className="text-gray-500"/>
        </button>
    )
}