import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { INTERNET_MENU } from '../utils/templates.js'
import { getActiveOutages } from '../services/outage.service.js'
import { createTicket } from '../services/ticket.service.js'

export const internetFlow = addKeyword<Provider, Database>(['1', 'problemas de internet', 'internet', 'no tengo internet', 'sin conexión', 'sin conexion'])
  .addAnswer(INTERNET_MENU, { capture: true }, async (ctx, { gotoFlow, fallBack, state }) => {
    const option = ctx.body.trim()

    if (option === '5') return gotoFlow(welcomeFlow)

    if (option === '1') {
      await state.update({ problemType: 'no_connection' })
      return
    }

    if (option === '2') {
      await state.update({ problemType: 'slow' })
      return
    }

    if (option === '3') {
      await state.update({ problemType: 'frequent_cuts' })
      return
    }

    if (option === '4') {
      await state.update({ problemType: 'red_light' })
      return
    }

    return fallBack('Opción no válida. Elegí un número del 1 al 5.')
  })
  .addAction(async (ctx, { flowDynamic, state, gotoFlow }) => {
    const problemType = state.get('problemType')

    if (problemType === 'no_connection') {
      await flowDynamic('🔌 *Sin conexión*\n\n¿Reiniciaste el módem? Desconectalo de la corriente, esperá 30 segundos y volvé a conectarlo.')
      await flowDynamic('¿Probaste eso? *Respondé*:\n1️⃣ *Sí, ya lo hice*\n2️⃣ *No, lo voy a intentar*')
    } else if (problemType === 'slow') {
      await flowDynamic('🐢 *Internet lento*\n\nProbá estos pasos:\n1. Reiniciá el módem\n2. Acercate al módem\n3. Desconectá dispositivos que no uses\n4. Probá con un cable de red')
      await flowDynamic('¿Necesitás que generemos un reclamo técnico?\n*Respondé*:\n1️⃣ *Sí, generar reclamo*\n2️⃣ *No, voy a probar*')
    } else if (problemType === 'frequent_cuts') {
      const outages = await getActiveOutages().catch(() => [])
      if (outages.length > 0) {
        await flowDynamic('⚠️ Hay incidencias activas en tu zona. Nuestro equipo ya está trabajando.')
        for (const outage of outages) {
          await flowDynamic(`📍 *${outage.zone}*\n${outage.description}`)
        }
        await flowDynamic('Si el problema persiste después de la resolución, no dudes en contactarnos.')
        return gotoFlow(welcomeFlow)
      }
      await flowDynamic('📶 *Cortes frecuentes*\n\nRevisá el estado del cableado y asegurate de que no haya conexiones flojas.')
      await flowDynamic('¿Querés que generemos un reclamo técnico?\n*Respondé*:\n1️⃣ *Sí, generar reclamo*\n2️⃣ *No, gracias*')
    } else if (problemType === 'red_light') {
      await flowDynamic('🔴 *Luz roja en el módem*\n\nEsto indica que el módem no recibe señal de fibra óptica.\n\n1. Verificá que el cable de fibra esté bien conectado\n2. Revisá que no esté dañado o doblado\n3. Reiniciá el módem')
      await flowDynamic('Si después de esto sigue la luz roja, generamos un reclamo técnico.\n*Respondé*:\n1️⃣ *Sí, generar reclamo*\n2️⃣ *Voy a revisar primero*')
    }
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, state, gotoFlow }) => {
    const answer = ctx.body.trim()
    const problemType = state.get('problemType')

    if (answer === '1') {
      if (problemType === 'no_connection') {
        await flowDynamic('⚠️ Si después de reiniciar seguís sin conexión, generemos un reclamo técnico.\n\nPor favor *ingresá tu número de cliente*:')
      } else {
        await flowDynamic('Por favor *ingresá tu número de cliente* para generar el reclamo:')
      }
    } else if (answer === '2') {
      await flowDynamic('👍 Perfecto. Si necesitás ayuda, volvé a escribirnos.')
      return gotoFlow(welcomeFlow)
    }
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, state, gotoFlow }) => {
    const clientId = ctx.body.trim()
    const problemType = state.get('problemType')

    const categoryMap: Record<string, 'internet' | 'billing' | 'technical_visit' | 'commercial' | 'other'> = {
      no_connection: 'internet',
      slow: 'internet',
      frequent_cuts: 'internet',
      red_light: 'internet',
    }

    const descriptionMap: Record<string, string> = {
      no_connection: 'Cliente reporta sin conexión a internet. Pasos básicos realizados sin éxito.',
      slow: 'Cliente reporta internet lento. Solicita revisión técnica.',
      frequent_cuts: 'Cliente reporta cortes frecuentes de internet.',
      red_light: 'Cliente reporta luz roja en módem persistente.',
    }

    try {
      await createTicket({
        clientId,
        category: categoryMap[problemType] ?? 'internet',
        description: descriptionMap[problemType] ?? 'Problema de internet no especificado',
      })
      await flowDynamic(`✅ *Reclamo generado exitosamente!*\n\nUn técnico se comunicará a la brevedad. Tu número de reclamo fue asignado automáticamente.`)
    } catch {
      await flowDynamic('❌ No pudimos generar el reclamo. Verificá el número de cliente e intentá de nuevo.')
    }

    return gotoFlow(welcomeFlow)
  })
