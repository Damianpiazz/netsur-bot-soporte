import { createFlow } from '@builderbot/bot'

import { welcomeFlow } from './welcome.flow.js'
import { internetFlow } from './internet.flow.js'
import { billingFlow } from './billing.flow.js'
import { servicesFlow } from './services.flow.js'
import { claimsFlow } from './claims.flow.js'
import { operatorFlow } from './operator.flow.js'
import { statusFlow } from './status.flow.js'
import { surveyFlow } from './survey.flow.js'
import { visitFlow } from './visit.flow.js'
import { historyFlow } from './history.flow.js'

export const adapterFlow = createFlow([
  welcomeFlow,
  internetFlow,
  billingFlow,
  servicesFlow,
  claimsFlow,
  operatorFlow,
  statusFlow,
  surveyFlow,
  visitFlow,
  historyFlow,
])
