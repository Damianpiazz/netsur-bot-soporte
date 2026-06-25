import type { Plan, Client } from '../types/index.js'
import { get, post } from './api.client.js'

interface ChangePlanPayload {
  clientId: string
  newPlanId: string
}

interface ChangePlanResponse {
  message: string
  client: { id: string; name: string }
  oldPlan: string
  newPlan: string
}

export async function getPlans(): Promise<Plan[]> {
  return get<Plan[]>('/plans')
}

export async function getPlan(planId: string): Promise<Plan> {
  return get<Plan>(`/plans/${planId}`)
}

export async function changePlan(payload: ChangePlanPayload): Promise<ChangePlanResponse> {
  return post<ChangePlanResponse>('/plans/change', payload)
}
