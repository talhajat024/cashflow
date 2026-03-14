import { httpClient } from "../../../shared/api/httpClient";
import type { WalletTabData } from "../types/wallet.types";

export const walletApi={
    getWalletTabData:async (walletId?:string):Promise <WalletTabData>=>{
        const params= walletId ? `?walletId=${walletId}`:"";
        const response= await httpClient.get<WalletTabData>(`/wallets/tab${params}`);
        console.log("Response of wallet api is:",response);
        return response.data;
    }
}