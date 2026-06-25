import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { formatVisitRequest } from '../utils/templates.js'
import { normalizeTimeSlot } from '../utils/validators.js'
import { requestVisit } from '../services/visit.service.js'

let visitClientId: string

export const visitFlow = addKeyword<Provider, Database>(['7', 'visita técnica', 'visita tecnica', 'visita', 'técnico', 'tecnico'])
  .addAnswer('🔧 Para solicitar una visita técnica, necesito tu *número de cliente*:', { capture: true },
    async (ctx, { fallBack }) => {
      const input = ctx.body.trim()
      if (!/^\d{4,10}$/.test(input)) {
        return fallBack('❌ El número de cliente debe ser numérico (ej: 1001). Intentá de nuevo:')
      }
      visitClientId = input
    }
  )
  .addAction(async (_, { flowDynamic, gotoFlow }) => {
    try {
      const { getClient } = await import('../services/client.service.js')
      const client = await getClient(visitClientId)
      await flowDynamic(formatVisitRequest(client.name))
    } catch {
      await flowDynamic('⚠️ No encontramos el cliente. Verificá el número.')
      return gotoFlow(welcomeFlow)
    }
  })
  .addAnswer('📌 *Paso 1:* Decime la *dirección* donde necesitás la visita:', { capture: true })
  .addAnswer('🕐 *Paso 2:* ¿Preferís *mañana* o *tarde*?', { capture: true },
    async (ctx, { fallBack }) => {
      const slot = ctx.body.trim().toLowerCase()
      if (!['mañana', 'tarde', 'manana'].includes(slot)) {
        return fallBack('Por favor respondé *mañana* o *tarde*:')
      }
    }
  )
  .addAnswer('📝 *Paso 3:* Describí brevemente el problema:', { capture: true })
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const description = ctx.body.trim()

    try {
      const result = await requestVisit({
        clientId: visitClientId,
        address: ctx.state.get('address') ?? '',
        timeSlot: normalizeTimeSlot(ctx.state.get('timeSlot') ?? ''),
        description,
      })

      await flowDynamic(`✅ *Visita técnica solicitada!*\n\n🔧 *Número de solicitud:* ${result.id}\n📌 *Dirección:* ${result.address}\n🕐 *Franja:* ${result.timeSlot}\n📝 *Problema:* ${result.description}\n\nTe confirmaremos el día y horario a la brevedad.`)
    } catch {
      await flowDynamic('❌ No pudimos registrar la visita. Intentá de nuevo más tarde.')
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
