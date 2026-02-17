import { useState,useEffect,useCallback } from "react";
import { fetchSearchResults } from "../api/search.api";
import type { SearchResult } from "../types/search.types";
import { debounceFn } from "../../../shared/utils/debounce";
import { searchIndex } from "../data/searchIndex";

export function useSearch(debounceDelay=400)
{
    const [query,setQuery]=useState<string>("");
    const [results,setResults]=useState<SearchResult[]>([]);
    const [loading,setLoading]=useState<boolean>(false);


    // const [isOpen,setIsOpen] = useState(false);

    // const results:SearchItem[] = useMemo(()=>{
    //     if(!query.trim()) return[];
    //     const q= query.toLowerCase();
    //     return searchIndex.filter(item => 
    //         item.label.toLowerCase().includes(q)
    //     );
    // },[query]);

    // Debounced Search function
    const search = useCallback(debounceFn(async(q:string)=>{
        if(!q){
            setResults([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        try{
            const data = q ? await fetchSearchResults(q) : searchIndex;
        setResults(data);
        }
        finally{
            setLoading(false);
        }
    },debounceDelay),[]);

     useEffect(() => {
    search(query);
  }, [query, search]);

  const close = () => {
    setQuery("");
    setResults([]);
  };

    return{
        query,
        setQuery,
        results,
        loading,
        close,
    };
}