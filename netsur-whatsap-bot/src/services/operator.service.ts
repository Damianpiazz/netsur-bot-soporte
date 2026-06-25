import { post } from './api.client.js'

interface EscalationPayload {
  clientId: string
  category: string
  description: string
}

interface EscalationResponse {
  message: string
  escalation: { id: string }
  ticket: { id: string }
}

export async function escalateToOperator(payload: EscalationPayload): Promise<EscalationResponse> {
  return post<EscalationResponse>('/operator', payload)
}
