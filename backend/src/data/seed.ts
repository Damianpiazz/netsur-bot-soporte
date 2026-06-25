import type { Client, Bill, Plan, Outage, Ticket, Survey, TechnicalVisit, OperatorEscalation } from '../types/index.js'

export const clients: Client[] = [
  { id: '1001', name: 'Juan Pérez', address: 'Av. Siempre Viva 742, La Plata', phone: '2215550101', documentNumber: 'DNI 30123456', planId: 'plan-a', planName: 'NetSur 100Mb', status: 'active', createdAt: '2024-01-15T10:00:00Z' },
  { id: '1002', name: 'María García', address: 'Calle 12 N° 345, La Plata', phone: '2215550102', documentNumber: 'DNI 33456789', planId: 'plan-b', planName: 'NetSur 300Mb', status: 'active', createdAt: '2024-02-20T10:00:00Z' },
  { id: '1003', name: 'Carlos López', address: 'Calle 8 N° 1234, Berisso', phone: '2215550103', documentNumber: 'DNI 28765432', planId: 'plan-c', planName: 'NetSur 500Mb', status: 'active', createdAt: '2024-03-10T10:00:00Z' },
  { id: '1004', name: 'Ana Martínez', address: 'Calle 50 N° 789, La Plata', phone: '2215550104', documentNumber: 'DNI 31222333', planId: 'plan-a', planName: 'NetSur 100Mb', status: 'suspended', createdAt: '2024-01-05T10:00:00Z' },
  { id: '1005', name: 'Pedro Rodríguez', address: 'Calle 7 N° 567, Ensenada', phone: '2215550105', documentNumber: 'DNI 34888999', planId: 'plan-b', planName: 'NetSur 300Mb', status: 'active', createdAt: '2024-04-01T10:00:00Z' },
]

export const plans: Plan[] = [
  { id: 'plan-a', name: 'NetSur 100Mb', speed: '100 Mbps', price: 8500, description: 'Ideal para hogares con hasta 3 dispositivos conectados', features: ['Fibra óptica', 'WiFi 5', 'Soporte 24/7', 'Instalación gratis'] },
  { id: 'plan-b', name: 'NetSur 300Mb', speed: '300 Mbps', price: 12500, description: 'Perfecto para streaming y gaming', features: ['Fibra óptica', 'WiFi 6', 'Soporte 24/7', 'Instalación gratis', 'Netflix incluido'] },
  { id: 'plan-c', name: 'NetSur 500Mb', speed: '500 Mbps', price: 18500, description: 'Para hogares con múltiples dispositivos', features: ['Fibra óptica', 'WiFi 6', 'Soporte prioritario 24/7', 'Instalación gratis', 'Netflix + Prime incluido'] },
  { id: 'plan-d', name: 'NetSur 1Gb', speed: '1 Gbps', price: 25000, description: 'Experiencia extrema para usuarios avanzados', features: ['Fibra óptica', 'WiFi 6E', 'Soporte premium 24/7', 'Instalación gratis', 'Netflix + Prime + Disney+ incluido', 'IP fija'] },
]

export const bills: Bill[] = [
  { id: 'fac-001', clientId: '1001', amount: 8500, dueDate: '2026-06-15', paid: false, period: 'Junio 2026', downloadUrl: '/api/bills/fac-001/download' },
  { id: 'fac-002', clientId: '1001', amount: 8500, dueDate: '2026-05-15', paid: true, paidAt: '2026-05-13', period: 'Mayo 2026', downloadUrl: '/api/bills/fac-002/download' },
  { id: 'fac-003', clientId: '1001', amount: 8500, dueDate: '2026-04-15', paid: true, paidAt: '2026-04-10', period: 'Abril 2026', downloadUrl: '/api/bills/fac-003/download' },
  { id: 'fac-004', clientId: '1002', amount: 12500, dueDate: '2026-06-20', paid: false, period: 'Junio 2026', downloadUrl: '/api/bills/fac-004/download' },
  { id: 'fac-005', clientId: '1002', amount: 12500, dueDate: '2026-05-20', paid: true, paidAt: '2026-05-18', period: 'Mayo 2026', downloadUrl: '/api/bills/fac-005/download' },
  { id: 'fac-006', clientId: '1003', amount: 18500, dueDate: '2026-06-10', paid: true, paidAt: '2026-06-08', period: 'Junio 2026', downloadUrl: '/api/bills/fac-006/download' },
  { id: 'fac-007', clientId: '1004', amount: 8500, dueDate: '2026-06-05', paid: false, period: 'Junio 2026', downloadUrl: '/api/bills/fac-007/download' },
  { id: 'fac-008', clientId: '1005', amount: 12500, dueDate: '2026-07-01', paid: false, period: 'Julio 2026', downloadUrl: '/api/bills/fac-008/download' },
]

export const tickets: Ticket[] = [
  { id: 'TK-1001', clientId: '1003', clientName: 'Carlos López', category: 'internet', priority: 'high', status: 'in_progress', description: 'Sin conexión desde las 18hs', createdAt: '2026-06-22T18:30:00Z', updatedAt: '2026-06-22T19:00:00Z' },
  { id: 'TK-1002', clientId: '1001', clientName: 'Juan Pérez', category: 'billing', priority: 'low', status: 'open', description: 'Consulta sobre factura duplicada', createdAt: '2026-06-21T10:15:00Z', updatedAt: '2026-06-21T10:15:00Z' },
  { id: 'TK-1003', clientId: '1005', clientName: 'Pedro Rodríguez', category: 'technical_visit', priority: 'medium', status: 'resolved', description: 'Solicita visita técnica por avería en poste', createdAt: '2026-06-20T09:00:00Z', updatedAt: '2026-06-22T11:30:00Z', resolution: 'Visita realizada. Problema resuelto.' },
]

export const outages: Outage[] = [
  { id: 'out-001', zone: 'La Plata - Centro', description: 'Corte programado por mantenimiento de red', startTime: '2026-06-25T02:00:00Z', estimatedEndTime: '2026-06-25T06:00:00Z', status: 'active' },
  { id: 'out-002', zone: 'Berisso', description: 'Incidencia masiva por rotura de fibra óptica', startTime: '2026-06-22T15:30:00Z', estimatedEndTime: '2026-06-22T20:00:00Z', status: 'active' },
]

export const surveys: Survey[] = []
export const visits: TechnicalVisit[] = []
export const escalations: OperatorEscalation[] = []

let ticketCounter = tickets.length
let surveyCounter = 0
let visitCounter = 0
let escalationCounter = 0

export function nextTicketId(): string {
  ticketCounter++
  return `TK-${1000 + ticketCounter}`
}

export function nextSurveyId(): string {
  surveyCounter++
  return `SUR-${String(surveyCounter + 1).padStart(3, '0')}`
}

export function nextVisitId(): string {
  visitCounter++
  return `VST-${String(visitCounter + 1).padStart(3, '0')}`
}

export function nextEscalationId(): string {
  escalationCounter++
  return `ESC-${String(escalationCounter + 1).padStart(3, '0')}`
}
