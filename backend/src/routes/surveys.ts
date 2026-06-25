import { Router } from 'express'
import { surveys, clients, nextSurveyId } from '../data/seed.js'

const router = Router()

router.post('/', (req, res) => {
  const { clientId, rating, comment } = req.body
  if (!clientId || !rating) {
    return res.status(400).json({ error: 'Faltan datos: clientId, rating' })
  }

  const client = clients.find(c => c.id === clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const survey = {
    id: nextSurveyId(),
    clientId,
    rating: Number(rating),
    comment: comment || '',
    createdAt: new Date().toISOString(),
  }

  surveys.push(survey)
  res.status(201).json(survey)
})

router.get('/average', (_req, res) => {
  if (surveys.length === 0) return res.json({ average: 0, total: 0 })

  const sum = surveys.reduce((acc, s) => acc + s.rating, 0)
  res.json({ average: (sum / surveys.length).toFixed(1), total: surveys.length })
})

export default router
