import { httpClient } from "../../../shared/api/httpClient";
import type { SearchResult } from "../types/search.types";

export async function fetchSearchResults(query:string):Promise<SearchResult[]>{
    if(!query) return [];
    const response = await httpClient.get(`/search?q=${encodeURIComponent(query)}`);
    return response.data;
}