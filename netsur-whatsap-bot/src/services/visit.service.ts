import type { TechnicalVisit } from '../types/index.js'
import { post } from './api.client.js'

interface VisitPayload {
  clientId: string
  address: string
  timeSlot: string
  description: string
}

export async function requestVisit(payload: VisitPayload): Promise<TechnicalVisit> {
  return post<TechnicalVisit>('/visits', payload)
}
