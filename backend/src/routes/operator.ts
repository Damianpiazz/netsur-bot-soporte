import { Router } from 'express'
import { escalations, clients, nextEscalationId, tickets, nextTicketId } from '../data/seed.js'

const router = Router()

router.post('/', (req, res) => {
  const { clientId, category, description } = req.body
  if (!clientId || !category || !description) {
    return res.status(400).json({ error: 'Faltan datos: clientId, category, description' })
  }

  const client = clients.find(c => c.id === clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const escalation = {
    id: nextEscalationId(),
    clientId,
    clientName: client.name,
    category,
    description,
    createdAt: new Date().toISOString(),
  }
  escalations.push(escalation)

  const ticket = {
    id: nextTicketId(),
    clientId,
    clientName: client.name,
    category: category as 'internet' | 'billing' | 'technical_visit' | 'commercial' | 'other',
    priority: 'high' as const,
    status: 'open' as const,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  tickets.push(ticket)

  res.status(201).json({
    message: 'Solicitud derivada a operador',
    escalation,
    ticket,
  })
})

export default router
