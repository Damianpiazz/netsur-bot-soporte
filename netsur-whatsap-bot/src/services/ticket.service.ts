import type { Ticket } from '../types/index.js'
import { get, post } from './api.client.js'

interface CreateTicketPayload {
  clientId: string
  category: 'internet' | 'billing' | 'technical_visit' | 'commercial' | 'other'
  description: string
}

export async function getTicket(ticketId: string): Promise<Ticket> {
  return get<Ticket>(`/tickets/${ticketId}`)
}

export async function createTicket(payload: CreateTicketPayload): Promise<Ticket> {
  return post<Ticket>('/tickets', payload)
}
