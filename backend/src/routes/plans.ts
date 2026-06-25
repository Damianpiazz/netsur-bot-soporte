import { Router } from 'express'
import { plans, clients } from '../data/seed.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(plans)
})

router.get('/:id', (req, res) => {
  const plan = plans.find(p => p.id === req.params.id)
  if (!plan) return res.status(404).json({ error: 'Plan no encontrado' })
  res.json(plan)
})

router.post('/change', (req, res) => {
  const { clientId, newPlanId } = req.body
  if (!clientId || !newPlanId) {
    return res.status(400).json({ error: 'Faltan datos: clientId, newPlanId' })
  }

  const client = clients.find(c => c.id === clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const newPlan = plans.find(p => p.id === newPlanId)
  if (!newPlan) return res.status(404).json({ error: 'Plan no encontrado' })

  const oldPlanName = client.planName
  client.planId = newPlan.id
  client.planName = newPlan.name

  res.json({
    message: 'Cambio de plan solicitado exitosamente',
    client: { id: client.id, name: client.name },
    oldPlan: oldPlanName,
    newPlan: newPlan.name,
  })
})

export default router
