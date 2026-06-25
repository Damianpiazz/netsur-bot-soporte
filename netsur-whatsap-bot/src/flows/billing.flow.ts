import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { BILLING_MENU, PAYMENT_METHODS, formatBill } from '../utils/templates.js'
import { getClientBills, getNextBill } from '../services/billing.service.js'
import { getClient } from '../services/client.service.js'

let billingClientId: string

export const billingFlow = addKeyword<Provider, Database>(['2', 'facturación', 'facturacion', 'factura', 'pagar', 'pago', 'deuda'])
  .addAnswer('🧾 Para consultar tu facturación, necesito tu *número de cliente*.\n\nPor favor ingresalo:', { capture: true },
    async (ctx, { fallBack }) => {
      const input = ctx.body.trim()
      if (!/^\d{4,10}$/.test(input)) {
        return fallBack('❌ El número de cliente debe ser numérico (ej: 1001). Intentá de nuevo:')
      }
      billingClientId = input
    }
  )
  .addAction(async (_, { flowDynamic, gotoFlow }) => {
    try {
      const client = await getClient(billingClientId)
      await flowDynamic(`👤 Cliente: *${client.name}*`)
    } catch {
      await flowDynamic('⚠️ No encontramos el cliente. Verificá el número e intentá de nuevo.')
      return gotoFlow(welcomeFlow)
    }
  })
  .addAnswer(BILLING_MENU, { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const option = ctx.body.trim()

    if (option === '5') return gotoFlow(welcomeFlow)

    if (!['1', '2', '3', '4'].includes(option)) {
      return fallBack('Opción no válida. Elegí un número del 1 al 5.')
    }
  })
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const option = ctx.body.trim()

    try {
      if (option === '1') {
        const data = await getClientBills(billingClientId)
        const unpaid = data.bills.filter(b => !b.paid)
        if (unpaid.length === 0) {
          await flowDynamic('✅ *No tenés deudas pendientes.* Estás al día con tus pagos.')
        } else {
          await flowDynamic(`📋 *Deuda pendiente:* ${unpaid.length} factura(s)\n`)
          for (const bill of unpaid) {
            await flowDynamic(formatBill(bill))
          }
        }
      } else if (option === '2') {
        const data = await getNextBill(billingClientId)
        if (data.message) {
          await flowDynamic(`✅ ${data.message}`)
        } else if (data.bill) {
          await flowDynamic(`📄 *Próximo vencimiento*\n\n${formatBill(data.bill)}`)
        }
      } else if (option === '3') {
        const data = await getClientBills(billingClientId)
        if (data.bills.length === 0) {
          await flowDynamic('No se encontraron facturas para este cliente.')
        } else {
          await flowDynamic(`📚 *Historial de facturas* (${data.bills.length} registros)\n`)
          for (const bill of data.bills) {
            await flowDynamic(formatBill(bill))
          }
        }
      } else if (option === '4') {
        await flowDynamic(PAYMENT_METHODS)
      }
    } catch {
      await flowDynamic('❌ Ocurrió un error al consultar. Intentá de nuevo más tarde.')
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
