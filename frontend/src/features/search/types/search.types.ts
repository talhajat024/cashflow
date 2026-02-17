export type SearchResultType = "page" | "wallet" | "transaction";

export interface SearchResult {
    id:string;
    label:string;
    path:string;
    type:SearchResultType;
};