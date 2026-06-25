import type { Outage } from '../types/index.js'
import { get } from './api.client.js'

export async function getActiveOutages(): Promise<Outage[]> {
  return get<Outage[]>('/outages')
}
