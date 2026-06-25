import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { formatOutage } from '../utils/templates.js'
import { getActiveOutages } from '../services/outage.service.js'

export const statusFlow = addKeyword<Provider, Database>(['6', 'estado del servicio', 'corte', 'cortes', 'incidencia', 'averia', 'avería'])
  .addAction(async (_, { flowDynamic, gotoFlow }) => {
    try {
      const outages = await getActiveOutages()

      if (outages.length === 0) {
        await flowDynamic('✅ *No hay incidencias activas* en este momento. El servicio funciona con normalidad.')
      } else {
        await flowDynamic(`⚠️ *Incidencias activas:* ${outages.length}\n`)
        for (const outage of outages) {
          await flowDynamic(formatOutage(outage))
        }
        await flowDynamic('Nuestro equipo ya se encuentra trabajando para resolver los inconvenientes.')
      }
    } catch {
      await flowDynamic('❌ No pudimos consultar el estado del servicio. Intentá de nuevo más tarde.')
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
