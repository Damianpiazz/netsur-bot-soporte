import { Router } from 'express'
import { bills, clients } from '../data/seed.js'

const router = Router()

router.get('/client/:clientId', (req, res) => {
  const client = clients.find(c => c.id === req.params.clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const clientBills = bills.filter(b => b.clientId === req.params.clientId)
  res.json({
    clientName: client.name,
    bills: clientBills,
  })
})

router.get('/client/:clientId/next', (req, res) => {
  const client = clients.find(c => c.id === req.params.clientId)
  if (!client) return res.status(404).json({ error: 'Cliente no encontrado' })

  const unpaid = bills
    .filter(b => b.clientId === client.id && !b.paid)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  if (unpaid.length === 0) {
    return res.json({ message: 'No tenés facturas pendientes', clientName: client.name })
  }

  res.json({ clientName: client.name, bill: unpaid[0], pendingCount: unpaid.length })
})

router.post('/:billId/pay', (req, res) => {
  const bill = bills.find(b => b.id === req.params.billId)
  if (!bill) return res.status(404).json({ error: 'Factura no encontrada' })
  if (bill.paid) return res.status(400).json({ error: 'La factura ya está paga' })

  bill.paid = true
  bill.paidAt = new Date().toISOString()
  res.json({ message: 'Factura registrada como paga', bill })
})

export default router
