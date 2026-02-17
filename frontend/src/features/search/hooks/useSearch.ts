import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { fetchSearchResults } from "../api/search.api";
import type { SearchResult } from "../types/search.types";
import { debounceFn } from "../../../shared/utils/debounce";
import { searchIndex } from "../data/searchIndex";

type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function useSearch(debounceDelay = 400) {
    
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Local Search function
  const searchLocally = useCallback((searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];
    const searchTerm = searchQuery.toLowerCase();
    return searchIndex.filter(
      (item) =>
        item.label.toLowerCase().includes(searchTerm) ||
        item.path.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm) ||
        item.id.toLowerCase().includes(searchTerm)
    );
  }, []);

  // API Search function 
  const searchViaApi = useCallback(async (searchQuery: string): Promise<SearchResult[]> => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    try {
      const data = await fetchSearchResults(searchQuery);
      return data;
      
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return [];
      }
      console.error("API Search failed:", error);
      throw error;
    }
  }, []);

  // Main search function
  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        if (isMounted.current) {
          setResults([]);
          setLoading(false);
        }
        return;
      }
      setLoading(true);

      try {
        let searchResults: SearchResult[];
        try {
          searchResults = await searchViaApi(searchQuery);
        } catch (apiError) {
          console.log("Falling back to local search");
          searchResults = searchLocally(searchQuery);
        }
        if (isMounted.current) {
          setResults(searchResults);
        }
      } catch (error) {
        console.error("Search failed.", error);
        if (isMounted.current) {
          setResults([]);
        }
      } finally {
        if (isMounted.current) {
          setLoading(false);
        }
      }
    },
    [searchViaApi, searchLocally]
  );


  const debouncedSearch = useMemo(
    () => debounceFn(performSearch, debounceDelay) as DebouncedFunction<typeof performSearch>,
    [performSearch, debounceDelay]
  );

  useEffect(() => {
    debouncedSearch(query);
    
    return () => {
      debouncedSearch.cancel?.();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, debouncedSearch]); 

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    debouncedSearch.cancel?.();
  }, [debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    loading,
    isOpen,
    open,
    close,
  };
}