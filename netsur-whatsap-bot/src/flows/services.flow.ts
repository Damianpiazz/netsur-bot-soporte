import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { SERVICES_MENU, formatPlan } from '../utils/templates.js'
import { getClient } from '../services/client.service.js'
import { getPlans, changePlan } from '../services/plan.service.js'

let servicesClientId: string

export const servicesFlow = addKeyword<Provider, Database>(['3', 'gestión de servicios', 'gestion de servicios', 'cambio de plan', 'cambiar plan', 'planes', 'plan'])
  .addAnswer('📡 Para gestionar tu servicio, necesito tu *número de cliente*:\n\nPor favor ingresalo:', { capture: true },
    async (ctx, { fallBack }) => {
      const input = ctx.body.trim()
      if (!/^\d{4,10}$/.test(input)) {
        return fallBack('❌ El número de cliente debe ser numérico (ej: 1001). Intentá de nuevo:')
      }
      servicesClientId = input
    }
  )
  .addAction(async (_, { flowDynamic, gotoFlow }) => {
    try {
      const client = await getClient(servicesClientId)
      await flowDynamic(`👤 Cliente: *${client.name}*\n📡 Plan actual: *${client.planName}*`)
    } catch {
      await flowDynamic('⚠️ No encontramos el cliente. Verificá el número e intentá de nuevo.')
      return gotoFlow(welcomeFlow)
    }
  })
  .addAnswer(SERVICES_MENU, { capture: true }, async (ctx, { gotoFlow, fallBack }) => {
    const option = ctx.body.trim()
    if (option === '4') return gotoFlow(welcomeFlow)
    if (!['1', '2', '3'].includes(option)) {
      return fallBack('Opción no válida. Elegí un número del 1 al 4.')
    }
  })
  .addAction(async (ctx, { flowDynamic, gotoFlow }) => {
    const option = ctx.body.trim()

    try {
      if (option === '1') {
        const client = await getClient(servicesClientId)
        const plans = await getPlans()
        const currentPlan = plans.find(p => p.id === client.planId)
        if (currentPlan) {
          await flowDynamic(formatPlan(currentPlan))
        }
      } else if (option === '2') {
        const plans = await getPlans()
        await flowDynamic(`📋 *Planes disponibles*\n\n`)
        for (const plan of plans) {
          await flowDynamic(formatPlan(plan))
        }
        await flowDynamic('Si querés cambiar de plan, seleccioná la opción 3 en el menú principal.')
      } else if (option === '3') {
        const plans = await getPlans()
        let msg = '📋 *Planes disponibles para cambio:*\n\n'
        for (const plan of plans) {
          msg += `*${plan.id}* - ${plan.name} ($${plan.price.toLocaleString('es-AR')}/mes)\n`
        }
        msg += '\n*Escribí el ID del plan* al que querés cambiar (ej: plan-b):'
        await flowDynamic(msg)
      }
    } catch {
      await flowDynamic('❌ Ocurrió un error. Intentá de nuevo más tarde.')
      return gotoFlow(welcomeFlow)
    }
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim().startsWith('plan-')) {
      const newPlanId = ctx.body.trim()

      try {
        const result = await changePlan({ clientId: servicesClientId, newPlanId })
        await flowDynamic(`✅ *${result.message}*`)
        await flowDynamic(`Plan anterior: *${result.oldPlan}* → Plan nuevo: *${result.newPlan}*`)
        await flowDynamic('📅 El cambio se verá reflejado en tu próxima facturación.')
      } catch {
        await flowDynamic('❌ No pudimos procesar el cambio. Verificá el ID del plan e intentá de nuevo.')
      }
    }

    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
