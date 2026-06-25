import { describe, it, expect } from 'vitest'
import express from 'express'
import request from 'supertest'
import clientsRouter from '../routes/clients.js'
import billsRouter from '../routes/bills.js'
import ticketsRouter from '../routes/tickets.js'
import plansRouter from '../routes/plans.js'
import outagesRouter from '../routes/outages.js'
import surveysRouter from '../routes/surveys.js'
import operatorRouter from '../routes/operator.js'

function createApp() {
  const app = express()
  app.use(express.json())
  app.use('/api/clients', clientsRouter)
  app.use('/api/bills', billsRouter)
  app.use('/api/tickets', ticketsRouter)
  app.use('/api/plans', plansRouter)
  app.use('/api/outages', outagesRouter)
  app.use('/api/surveys', surveysRouter)
  app.use('/api/operator', operatorRouter)
  return app
}

describe('API - Health', () => {
  it('should return 200 OK', async () => {
    const app = express()
    app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('API - Clients', () => {
  const app = createApp()

  it('GET /api/clients/:id returns a client', async () => {
    const res = await request(app).get('/api/clients/1001')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('Juan Pérez')
    expect(res.body.planName).toBe('NetSur 100Mb')
  })

  it('GET /api/clients/:id returns 404 for unknown client', async () => {
    const res = await request(app).get('/api/clients/9999')
    expect(res.status).toBe(404)
  })

  it('GET /api/clients/:id/history returns tickets', async () => {
    const res = await request(app).get('/api/clients/1001/history')
    expect(res.status).toBe(200)
    expect(res.body.client.name).toBe('Juan Pérez')
    expect(Array.isArray(res.body.tickets)).toBe(true)
  })
})

describe('API - Bills', () => {
  const app = createApp()

  it('GET /api/bills/client/:clientId returns bills', async () => {
    const res = await request(app).get('/api/bills/client/1001')
    expect(res.status).toBe(200)
    expect(res.body.clientName).toBe('Juan Pérez')
    expect(res.body.bills.length).toBeGreaterThan(0)
  })

  it('GET /api/bills/client/:clientId/next returns next bill', async () => {
    const res = await request(app).get('/api/bills/client/1001/next')
    expect(res.status).toBe(200)
    expect(res.body.bill).toBeDefined()
    expect(res.body.bill.paid).toBe(false)
  })
})

describe('API - Tickets', () => {
  const app = createApp()

  it('GET /api/tickets/:id returns a ticket', async () => {
    const res = await request(app).get('/api/tickets/TK-1001')
    expect(res.status).toBe(200)
    expect(res.body.id).toBe('TK-1001')
    expect(res.body.clientName).toBe('Carlos López')
  })

  it('GET /api/tickets/:id returns 404 for unknown', async () => {
    const res = await request(app).get('/api/tickets/TK-9999')
    expect(res.status).toBe(404)
  })

  it('POST /api/tickets creates a ticket', async () => {
    const res = await request(app)
      .post('/api/tickets')
      .send({ clientId: '1001', category: 'internet', description: 'Test ticket' })
    expect(res.status).toBe(201)
    expect(res.body.clientId).toBe('1001')
    expect(res.body.status).toBe('open')
  })

  it('POST /api/tickets returns 400 with missing data', async () => {
    const res = await request(app).post('/api/tickets').send({})
    expect(res.status).toBe(400)
  })
})

describe('API - Plans', () => {
  const app = createApp()

  it('GET /api/plans returns all plans', async () => {
    const res = await request(app).get('/api/plans')
    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThanOrEqual(4)
  })

  it('GET /api/plans/:id returns a plan', async () => {
    const res = await request(app).get('/api/plans/plan-a')
    expect(res.status).toBe(200)
    expect(res.body.name).toBe('NetSur 100Mb')
  })

  it('POST /api/plans/change changes client plan', async () => {
    const res = await request(app)
      .post('/api/plans/change')
      .send({ clientId: '1001', newPlanId: 'plan-b' })
    expect(res.status).toBe(200)
    expect(res.body.newPlan).toBe('NetSur 300Mb')
  })
})

describe('API - Outages', () => {
  const app = createApp()

  it('GET /api/outages returns active outages', async () => {
    const res = await request(app).get('/api/outages')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})

describe('API - Surveys', () => {
  const app = createApp()

  it('POST /api/surveys creates a survey', async () => {
    const res = await request(app)
      .post('/api/surveys')
      .send({ clientId: '1001', rating: 5, comment: 'Excelente' })
    expect(res.status).toBe(201)
    expect(res.body.rating).toBe(5)
  })
})

describe('API - Operator', () => {
  const app = createApp()

  it('POST /api/operator escalates to operator', async () => {
    const res = await request(app)
      .post('/api/operator')
      .send({ clientId: '1001', category: 'billing', description: 'Problema con factura' })
    expect(res.status).toBe(201)
    expect(res.body.ticket).toBeDefined()
    expect(res.body.escalation).toBeDefined()
  })
})
