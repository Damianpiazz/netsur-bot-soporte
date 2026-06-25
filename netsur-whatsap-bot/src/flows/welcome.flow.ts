import { addKeyword, utils } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { WELCOME_MESSAGE } from '../utils/templates.js'

export const welcomeFlow = addKeyword<Provider, Database>(['hola', 'menu', 'menú', 'inicio', 'empezar', 'net sur', 'netsur', 'buenos dias', 'buenos días', 'buenas tardes', utils.setEvent('WELCOME')])
  .addAnswer(WELCOME_MESSAGE)
