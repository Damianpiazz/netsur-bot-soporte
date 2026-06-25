import type { Client, ClientHistory } from '../types/index.js'
import { get } from './api.client.js'

export async function getClient(clientId: string): Promise<Client> {
  return get<Client>(`/clients/${clientId}`)
}

export async function getClientHistory(clientId: string): Promise<ClientHistory> {
  return get<ClientHistory>(`/clients/${clientId}/history`)
}
