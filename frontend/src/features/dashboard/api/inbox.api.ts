import { httpClient } from "../../../shared/api/httpClient";
import type { InboxMessage } from "../types/inbox.types";

export async function fetchInboxMessages():Promise<InboxMessage[]>{
  const response = await httpClient.get<InboxMessage[]>("/inbox/messages"); // make the route accordingly
  return response.data;
}