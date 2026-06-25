import { createBot, createProvider } from '@builderbot/bot'
import { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import { adapterFlow } from './flows/index.js'
import { config } from './config/index.js'

const main = async () => {
  const adapterProvider = createProvider(Provider, {
    version: [2, 3000, 1035824857],
  })

  const adapterDB = new Database({
    host: process.env.POSTGRES_DB_HOST,
    user: process.env.POSTGRES_DB_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: +process.env.POSTGRES_DB_PORT,
  })

  const { handleCtx, httpServer } = await createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  })

  adapterProvider.server.post(
    '/v1/messages',
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body
      await bot.sendMessage(number, message, { media: urlMedia ?? null })
      return res.end('sended')
    })
  )

  adapterProvider.server.post(
    '/v1/welcome',
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body
      await bot.dispatch('WELCOME', { from: number, name: name ?? '' })
      return res.end('trigger')
    })
  )

  adapterProvider.server.post(
    '/v1/blacklist',
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body
      if (intent === 'remove') bot.blacklist.remove(number)
      if (intent === 'add') bot.blacklist.add(number)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ status: 'ok', number, intent }))
    })
  )

  adapterProvider.server.get(
    '/v1/blacklist/list',
    handleCtx(async (bot, req, res) => {
      const blacklist = bot.blacklist.getList()
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ status: 'ok', blacklist }))
    })
  )

  httpServer(+config.botPort)
  console.log(`NetSurBot corriendo en puerto ${config.botPort}`)
  console.log(`Backend API: ${config.backendUrl}`)
}

main()
