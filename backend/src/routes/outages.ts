import { Router } from 'express'
import { outages } from '../data/seed.js'

const router = Router()

router.get('/', (_req, res) => {
  const activeOutages = outages.filter(o => o.status === 'active')
  res.json(activeOutages)
})

router.get('/zone/:zone', (req, res) => {
  const zone = req.params.zone.toLowerCase()
  const zoneOutages = outages.filter(o =>
    o.zone.toLowerCase().includes(zone) && o.status === 'active'
  )
  res.json(zoneOutages)
})

export default router
