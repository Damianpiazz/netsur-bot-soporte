import { Router } from 'express'
import { tickets, clients, nextTicketId } from '../data/seed.js'

const router = Router()

router.get('/:id', (req, res) => {
  const ticket = tickets.find(t => t.id === req.params.id.toUpperCase())
  if (!ticket) return res.status(404).json({ error: 'Reclamo no encontrado' })
  res.json(ticket)
})

router.post('/', (req, res) => {
  const { clientId, category, description } = req.body
  if (!clientId || !category || !description) {
    return res.status(400).json({ error: 'Faltan datos requeridos: clientId, category, description' })
  }

  const client = clients.find(c => c.id === clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const ticket = {
    id: nextTicketId(),
    clientId,
    clientName: client.name,
    category,
    priority: 'medium' as const,
    status: 'open' as const,
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tickets.push(ticket)
  res.status(201).json(ticket)
})

export default router
