import type { Survey } from '../types/index.js'
import { post } from './api.client.js'

interface SurveyPayload {
  clientId: string
  rating: number
  comment?: string
}

export async function submitSurvey(payload: SurveyPayload): Promise<Survey> {
  return post<Survey>('/surveys', payload)
}
