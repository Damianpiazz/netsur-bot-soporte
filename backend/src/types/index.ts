export interface Client {
  id: string
  name: string
  address: string
  phone: string
  documentNumber: string
  planId: string
  planName: string
  status: 'active' | 'suspended'
  createdAt: string
}

export interface Bill {
  id: string
  clientId: string
  amount: number
  dueDate: string
  paid: boolean
  paidAt?: string
  period: string
  downloadUrl: string
}

export interface Ticket {
  id: string
  clientId: string
  clientName: string
  category: 'internet' | 'billing' | 'technical_visit' | 'commercial' | 'other'
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  description: string
  createdAt: string
  updatedAt: string
  resolution?: string
}

export interface Plan {
  id: string
  name: string
  speed: string
  price: number
  description: string
  features: string[]
}

export interface Outage {
  id: string
  zone: string
  description: string
  startTime: string
  estimatedEndTime?: string
  status: 'active' | 'resolved'
}

export interface Survey {
  id: string
  clientId: string
  rating: number
  comment?: string
  createdAt: string
}

export interface TechnicalVisit {
  id: string
  clientId: string
  clientName: string
  address: string
  timeSlot: string
  description: string
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled'
  createdAt: string
}

export interface OperatorEscalation {
  id: string
  clientId: string
  clientName: string
  category: string
  description: string
  createdAt: string
}
