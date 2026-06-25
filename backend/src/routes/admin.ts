import { Router } from 'express'
import {
  bills,
  clients,
  escalations,
  outages,
  plans,
  surveys,
  tickets,
  visits,
} from '../data/seed.js'

const router = Router()

const resources = {
  clients,
  plans,
  bills,
  tickets,
  outages,
  surveys,
  visits,
  escalations,
} as const

type ResourceName = keyof typeof resources
type ResourceItem = { id: string; [key: string]: unknown }

function getCollection(resource: string): ResourceItem[] | null {
  if (!(resource in resources)) return null
  return resources[resource as ResourceName] as unknown as ResourceItem[]
}

function makeId(resource: string): string {
  const prefix = resource.slice(0, 3).toUpperCase()
  return `${prefix}-${Date.now()}`
}

router.get('/resources', (_req, res) => {
  res.json(Object.keys(resources))
})

router.get('/:resource', (req, res) => {
  const collection = getCollection(req.params.resource)
  if (!collection) return res.status(404).json({ error: 'Recurso no encontrado' })
  res.json(collection)
})

router.get('/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource)
  if (!collection) return res.status(404).json({ error: 'Recurso no encontrado' })

  const item = collection.find(row => row.id === req.params.id)
  if (!item) return res.status(404).json({ error: 'Registro no encontrado' })
  res.json(item)
})

router.post('/:resource', (req, res) => {
  const collection = getCollection(req.params.resource)
  if (!collection) return res.status(404).json({ error: 'Recurso no encontrado' })

  const item = {
    ...req.body,
    id: req.body.id || makeId(req.params.resource),
  }

  if (collection.some(row => row.id === item.id)) {
    return res.status(409).json({ error: 'Ya existe un registro con ese id' })
  }

  collection.push(item)
  res.status(201).json(item)
})

router.put('/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource)
  if (!collection) return res.status(404).json({ error: 'Recurso no encontrado' })

  const index = collection.findIndex(row => row.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Registro no encontrado' })

  const updated = {
    ...collection[index],
    ...req.body,
    id: req.params.id,
  }

  collection[index] = updated
  res.json(updated)
})

router.delete('/:resource/:id', (req, res) => {
  const collection = getCollection(req.params.resource)
  if (!collection) return res.status(404).json({ error: 'Recurso no encontrado' })

  const index = collection.findIndex(row => row.id === req.params.id)
  if (index === -1) return res.status(404).json({ error: 'Registro no encontrado' })

  const [deleted] = collection.splice(index, 1)
  res.json({ deleted })
})

export default router
