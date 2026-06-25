import { Router } from 'express'
import { visits, clients, nextVisitId } from '../data/seed.js'

const router = Router()

router.post('/', (req, res) => {
  const { clientId, address, timeSlot, description } = req.body
  if (!clientId || !address || !timeSlot || !description) {
    return res.status(400).json({ error: 'Faltan datos: clientId, address, timeSlot, description' })
  }

  const client = clients.find(c => c.id === clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const visit = {
    id: nextVisitId(),
    clientId,
    clientName: client.name,
    address,
    timeSlot,
    description,
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
  }

  visits.push(visit)
  res.status(201).json(visit)
})

router.get('/client/:clientId', (req, res) => {
  const clientVisits = visits.filter(v => v.clientId === req.params.clientId)
  res.json(clientVisits)
})

export default router
