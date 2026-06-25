import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { OPERATOR_MENU } from '../utils/templates.js'
import { escalateToOperator } from '../services/operator.service.js'

export const operatorFlow = addKeyword<Provider, Database>(['5', 'operador', 'hablar con alguien', 'humano', 'persona', 'operador'])
  .addAnswer(OPERATOR_MENU, { capture: true }, async (ctx, { gotoFlow }) => {
    if (ctx.body.trim().toLowerCase() === 'volver') return gotoFlow(welcomeFlow)
  })
  .addAnswer('Gracias. Para poder derivarte al área correcta, necesito tu *número de cliente*:', { capture: true })
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const clientId = ctx.body.trim()
    const description = ctx.state.get('description') ?? 'Consulta pendiente'

    if (!/^\d{4,10}$/.test(clientId)) {
      await flowDynamic('❌ Número de cliente no válido. Por favor verificá e intentá de nuevo.')
      return gotoFlow(welcomeFlow)
    }

    try {
      const result = await escalateToOperator({
        clientId,
        category: 'other',
        description,
      })

      await flowDynamic(`✅ *Solicitud derivada a operador!*\n\n📋 *Ticket:* ${result.ticket.id}\n🔖 *Escalación:* ${result.escalation.id}\n\nUn operador se comunicará a la brevedad. Por favor permanecé atento.`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
      await flowDynamic(`❌ No pudimos derivar tu consulta: ${errorMessage}\n\nIntentá de nuevo más tarde o comunicate al *0800-123-4567*.`)
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
