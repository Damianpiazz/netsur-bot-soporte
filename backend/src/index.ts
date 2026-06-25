import express from 'express'
import cors from 'cors'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import clientsRouter from './routes/clients.js'
import billsRouter from './routes/bills.js'
import ticketsRouter from './routes/tickets.js'
import plansRouter from './routes/plans.js'
import outagesRouter from './routes/outages.js'
import surveysRouter from './routes/surveys.js'
import visitsRouter from './routes/visits.js'
import operatorRouter from './routes/operator.js'
import adminRouter from './routes/admin.js'
import adminViewsRouter from './routes/admin-views.js'
import { initDatabase } from './database/init.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT ?? 3001

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'NetSur Backend API', version: '1.0.0' })
})

app.use('/api/clients', clientsRouter)
app.use('/api/bills', billsRouter)
app.use('/api/tickets', ticketsRouter)
app.use('/api/plans', plansRouter)
app.use('/api/outages', outagesRouter)
app.use('/api/surveys', surveysRouter)
app.use('/api/visits', visitsRouter)
app.use('/api/operator', operatorRouter)
app.use('/api/admin', adminRouter)
app.use('/admin', adminViewsRouter)

app.get('/', (_req, res) => {
  res.redirect('/admin/')
})

async function start() {
  await initDatabase()

  app.listen(PORT, () => {
    console.log(`NetSur Backend API corriendo en http://localhost:${PORT}`)
    console.log(`Admin dashboard: http://localhost:${PORT}/admin/`)
    console.log(`Health check: http://localhost:${PORT}/api/health`)
  })
}

start()
