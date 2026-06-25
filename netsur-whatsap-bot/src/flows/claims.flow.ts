import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { CLAIM_MENU, formatTicket } from '../utils/templates.js'
import { getTicket } from '../services/ticket.service.js'
import { getClient } from '../services/client.service.js'

export const claimsFlow = addKeyword<Provider, Database>(['4', 'reclamo', 'reclamos', 'estado de reclamo', 'seguimiento', 'ticket'])
  .addAnswer(CLAIM_MENU, { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const option = ctx.body.trim()
    if (option === '3') return gotoFlow(welcomeFlow)
    if (!['1', '2'].includes(option)) {
      return fallBack('Opción no válida. Elegí un número del 1 al 3.')
    }
  })
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const option = ctx.body.trim()

    if (option === '1') {
      await flowDynamic('Ingresá el *número de reclamo* (ej: TK-1001):')
    } else if (option === '2') {
      await flowDynamic('Ingresá tu *número de cliente* para ver tus reclamos:')
    }
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    const input = ctx.body.trim()
    const option = ctx.state.get('option') ?? ''

    try {
      if (input.toUpperCase().startsWith('TK-')) {
        const ticket = await getTicket(input.toUpperCase())
        await flowDynamic(formatTicket(ticket))
      } else if (/^\d{4,10}$/.test(input)) {
        const client = await getClient(input)
        await flowDynamic(`👤 Reclamos de *${client.name}*`)
        const { getClientHistory } = await import('../services/client.service.js')
        const history = await getClientHistory(input)
        if (history.tickets.length === 0) {
          await flowDynamic('📭 No tenés reclamos registrados.')
        } else {
          for (const ticket of history.tickets) {
            await flowDynamic(formatTicket(ticket))
          }
        }
      } else {
        await flowDynamic('❌ Formato no válido. Ingresá un número de reclamo (TK-XXXX) o número de cliente.')
        return gotoFlow(welcomeFlow)
      }
    } catch {
      await flowDynamic('❌ No encontramos el reclamo. Verificá el número e intentá de nuevo.')
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
