export type SearchItemType = 
| "page"
| "wallet" 
| "transaction";

export interface SearchItem {
    id:string;
    type:SearchItemType;
    label:string;
    path:string;
}

export const searchIndex :SearchItem[]=[
    {
        id:'dashboard',
        type:"page",
        label:'Dashboard',
        path:'/dashboard'
    },
    {
        id:'analytics',
        type:"page",
        label:'Analytics',
        path:'/analytics',
    },
    {
    id: "wallets",
    type: "page",
    label: "Wallets",
    path: "/wallets",
  },
  {
    id: "transactions",
    type: "page",
    label: "Transactions",
    path: "/transactions",
  },
];


