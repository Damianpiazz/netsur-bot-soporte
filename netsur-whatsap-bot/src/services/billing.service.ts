import type { Bill } from '../types/index.js'
import { get } from './api.client.js'

interface BillsResponse {
  clientName: string
  bills: Bill[]
}

interface NextBillResponse {
  clientName: string
  bill?: Bill
  pendingCount?: number
  message?: string
}

export async function getClientBills(clientId: string): Promise<BillsResponse> {
  return get<BillsResponse>(`/bills/client/${clientId}`)
}

export async function getNextBill(clientId: string): Promise<NextBillResponse> {
  return get<NextBillResponse>(`/bills/client/${clientId}/next`)
}
