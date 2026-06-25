import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'
import { formatSurveyPrompt } from '../utils/templates.js'
import { submitSurvey } from '../services/survey.service.js'

export const surveyFlow = addKeyword<Provider, Database>(['encuesta', 'satisfacción', 'satisfaccion', 'calificar', 'opinion'])
  .addAction(async (_, { flowDynamic, state }) => {
    await state.update({ expectingRating: true })
  })
  .addAnswer(formatSurveyPrompt(), { capture: true }, async (ctx, { fallBack, flowDynamic }) => {
    const rating = Number(ctx.body.trim())

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return fallBack('❌ Respondé con un número del *1* al *5*.\n\nEjemplo: 5')
    }

    if (rating <= 3) {
      await flowDynamic('Gracias por tu opinión. ¿Querés dejarnos un comentario para mejorar? (Escribilo o decí "no" para omitir)')
    } else {
      await flowDynamic('¡Gracias por tu buena calificación! 😊 Nos alegra que estés conforme.')
      try {
        const client = await import('../services/client.service.js').then(m => m.getClient('1001'))
        await submitSurvey({ clientId: client.id, rating }).catch(() => {})
      } catch {}
      await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
    }
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    const comment = ctx.body.trim().toLowerCase()

    if (comment !== 'no' && comment !== '2') {
      try {
        await submitSurvey({ clientId: '1001', rating: 3, comment: ctx.body.trim() }).catch(() => {})
      } catch {}
    }

    if (comment === '1') return gotoFlow(welcomeFlow)

    await flowDynamic('🙌 Gracias por tu feedback! Nos ayuda a mejorar.')
    await flowDynamic('¿Necesitás algo más?\n1️⃣ *Sí, volver al menú*\n2️⃣ *No, gracias*')
  })
  .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
    if (ctx.body.trim() === '1') return gotoFlow(welcomeFlow)
    await flowDynamic('🙌 Gracias por comunicarte con NetSurBot. ¡Que tengas un buen día!')
    return
  })
