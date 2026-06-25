import { Router } from 'express'
import {
  clients, tickets, outages, surveys, plans, visits,
} from '../data/seed.js'

const router = Router()

router.get('/', (_req, res) => {
  const openTickets = tickets.filter(t => t.status === 'open' || t.status === 'in_progress')
  const activeOutages = outages.filter(o => o.status === 'active')
  const recentTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5)

  const stats = {
    clients: clients.length,
    openTickets: openTickets.length,
    activeOutages: activeOutages.length,
    surveys: surveys.length,
    plans: plans.length,
    visits: visits.length,
    recentTickets,
    activeOutagesList: activeOutages,
  }

  res.render('dashboard', { stats }, (_err, dashboardHtml) => {
    res.render('layout', {
      title: 'Dashboard',
      currentPage: 'dashboard',
      body: dashboardHtml,
    })
  })
})

const entityList = ['clients', 'plans', 'bills', 'tickets', 'outages', 'surveys', 'visits', 'escalations']

router.get('/entities/:resource', (req, res) => {
  const { resource } = req.params
  if (!entityList.includes(resource)) {
    return res.status(404).send('Recurso no encontrado')
  }

  res.render('entities', { resource }, (_err, entitiesHtml) => {
    res.render('layout', {
      title: resource.charAt(0).toUpperCase() + resource.slice(1),
      currentPage: resource,
      body: entitiesHtml,
    })
  })
})

router.get('/templates', (_req, res) => {
  res.render('templates', {}, (_err, templatesHtml) => {
    res.render('layout', {
      title: 'Plantillas',
      currentPage: 'templates',
      body: templatesHtml,
    })
  })
})

export default router
