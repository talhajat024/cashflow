import { useState,useMemo } from "react";
import { searchIndex } from "../data/searchIndex";
import type { SearchItem } from "../data/searchIndex";

export function useSearch()
{
    const [query,setQuery]=useState("");
    const [isOpen,setIsOpen] = useState(false);

    const results:SearchItem[] = useMemo(()=>{
        if(!query.trim()) return[];
        const q= query.toLowerCase();
        return searchIndex.filter(item => 
            item.label.toLowerCase().includes(q)
        );
    },[query]);

    return{
        query,
        setQuery,
        isOpen,
        open:()=> setIsOpen(true),
        close:()=> {
        setIsOpen(false);
        setQuery("");
        },
        results,
    };
}