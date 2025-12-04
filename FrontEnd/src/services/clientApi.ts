import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
});

export type ActionType = "withdrawal" | "deposit" | "loan";

export interface CreateActionPayload {
  actionType: ActionType;
  amount: number;
  actionDate?: string;
  interest?: number;
  payments?: number;
}

export async function apiGetAllAccounts(): Promise<any> {
  const res = await api.get("/accounts");
  return res.data;
}

export async function apiGetActionsByAccount(accountNumber: number): Promise<any> {
  const res = await api.get(`/action/${accountNumber}`);
  return res.data;
}

export async function apiCreateAction(
  accountNumber: number,
  payload: CreateActionPayload
): Promise<any> {
  const res = await api.post(`/action/${accountNumber}`, payload);
  return res.data;
}
