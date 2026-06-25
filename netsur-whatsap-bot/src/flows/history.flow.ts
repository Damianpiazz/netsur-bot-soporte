import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { formatTicket } from '../utils/templates.js'
import { getClientHistory } from '../services/client.service.js'

export const historyFlow = addKeyword<Provider, Database>(['8', 'historial', 'historial de consultas', 'mis consultas', 'últimos', 'ultimos'])
  .addAnswer('📋 Para ver tu historial, necesito tu *número de cliente*:', { capture: true },
    async (ctx, { fallBack }) => {
      const input = ctx.body.trim()
      if (!/^\d{4,10}$/.test(input)) {
        return fallBack('❌ El número de cliente debe ser numérico (ej: 1001). Intentá de nuevo:')
      }
    }
  )
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const clientId = ctx.body.trim()

    try {
      const history = await getClientHistory(clientId)

      await flowDynamic(`👤 *${history.client.name}*\n📡 *Plan:* ${history.client.planName}\n`)

      if (history.tickets.length === 0) {
        await flowDynamic('📭 *No tenés consultas registradas* en nuestro sistema.')
      } else {
        await flowDynamic(`📋 *Últimas ${history.tickets.length} consultas:*\n`)
        for (const ticket of history.tickets) {
          await flowDynamic(formatTicket(ticket))
        }
      }
    } catch {
      await flowDynamic('❌ No encontramos el historial. Verificá el número de cliente.')
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
