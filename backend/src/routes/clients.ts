import { Router } from 'express'
import { clients, tickets } from '../data/seed.js'

const router = Router()

router.get('/:id', (req, res) => {
  const client = clients.find(c => c.id === req.params.id)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })
  res.json(client)
})

router.get('/:id/tickets', (req, res) => {
  const clientTickets = tickets.filter(t => t.clientId === req.params.id)
  res.json(clientTickets)
})

router.get('/:id/history', (req, res) => {
  const client = clients.find(c => c.id === req.params.id)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const clientTickets = tickets.filter(t => t.clientId === client.id)
  res.json({
    client: { id: client.id, name: client.name, planName: client.planName },
    tickets: clientTickets,
  })
})

export default router
