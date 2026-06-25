import { describe, it, expect } from 'vitest'
import { createBot, TestTool } from '@builderbot/bot'
import { adapterFlow } from '../flows/index.js'

function getAllNodes() {
  const nodes: Array<{ flow: string; node: Record<string, unknown> }> = []
  for (const flow of adapterFlow.flowRaw) {
    const keyword = Array.isArray(flow.ctx.keyword)
      ? (flow.ctx.keyword as string[]).join(', ')
      : String(flow.ctx.keyword)
    const json = flow.toJson() as Array<Record<string, unknown>>
    for (const node of json) {
      nodes.push({ flow: keyword, node })
    }
  }
  return nodes
}

describe('Estructura de nodos (toJson)', () => {
  const nodes = getAllNodes()

  it('todo __capture_only_intended__ tiene capture: true', () => {
    const offenders = nodes.filter(
      (n) => n.node.answer === '__capture_only_intended__' && (n.node.options as Record<string, unknown>)?.capture !== true
    )
    if (offenders.length > 0) {
      console.error('Nodos __capture_only_intended__ sin capture:', offenders)
    }
    expect(offenders).toHaveLength(0)
  })

  it('ningún __call_action__ tiene capture: true', () => {
    const offenders = nodes.filter(
      (n) => n.node.answer === '__call_action__' && (n.node.options as Record<string, unknown>)?.capture === true
    )
    if (offenders.length > 0) {
      console.error('Nodos __call_action__ con capture:true:', offenders)
    }
    expect(offenders).toHaveLength(0)
  })

  it('addAnswer con callback (sin ser __call_action__ ni __capture_only_intended__) también tiene capture: true', () => {
    const textNodesWithCb = nodes.filter(
      (n) =>
        typeof n.node.answer === 'string' &&
        n.node.answer !== '__call_action__' &&
        n.node.answer !== '__capture_only_intended__' &&
        (n.node.options as Record<string, unknown>)?.callback === true
    )
    const withoutCapture = textNodesWithCb.filter(
      (n) => (n.node.options as Record<string, unknown>)?.capture !== true
    )
    if (withoutCapture.length > 0) {
      console.error('addAnswer con callback pero sin capture:true:', withoutCapture)
    }
    expect(withoutCapture).toHaveLength(0)
  })

  it('cada flujo tiene al menos un nodo (keyword)', () => {
    for (const flow of adapterFlow.flowRaw) {
      const json = flow.toJson() as Array<Record<string, unknown>>
      expect(json.length).toBeGreaterThanOrEqual(1)
    }
  })
})

describe('Integración con TestProvider', () => {
  it('crea el bot sin errores', async () => {
    const bot = await createBot({
      flow: adapterFlow,
      provider: new TestTool.TestProvider(),
      database: new TestTool.TestDB(),
    })
    expect(bot).toBeDefined()
    expect(bot.flowClass).toBeDefined()
    expect(bot.database).toBeDefined()
  })

  it('internet flow: recibe mensaje y guarda en DB', async () => {
    const bot = await createBot({
      flow: adapterFlow,
      provider: new TestTool.TestProvider(),
      database: new TestTool.TestDB(),
    })

    const result = await bot.handleMsg({ from: 'test-1', body: '1', name: 'Test' })
    expect(result).toBeDefined()
    expect(result.createCtxMessage).toBeTypeOf('function')
    expect(result.clearQueue).toBeTypeOf('function')

    const history = (bot.database as { listHistory: Array<Record<string, unknown>> }).listHistory
    expect(history.length).toBeGreaterThan(0)

    const lastEntry = history[history.length - 1]
    expect(lastEntry.from).toBe('test-1')
  })

  it('internet flow: selecciona opción 1 y continúa', async () => {
    const bot = await createBot({
      flow: adapterFlow,
      provider: new TestTool.TestProvider(),
      database: new TestTool.TestDB(),
    })

    await bot.handleMsg({ from: 'test-2', body: '1', name: 'Test' })
    const history1 = (bot.database as { listHistory: Array<Record<string, unknown>> }).listHistory.length

    await bot.handleMsg({ from: 'test-2', body: '1' })
    const history2 = (bot.database as { listHistory: Array<Record<string, unknown>> }).listHistory.length

    expect(history2).toBeGreaterThan(history1)
  })

  it('internet flow: recorrido completo menú → reclamo → número de cliente', async () => {
    const bot = await createBot({
      flow: adapterFlow,
      provider: new TestTool.TestProvider(),
      database: new TestTool.TestDB(),
    })

    const getHistory = () =>
      (bot.database as { listHistory: Array<Record<string, unknown>> }).listHistory

    const getMessages = () =>
      getHistory()
        .filter((e) => {
          const a = e.answer as string
          return a && a !== '__call_action__' && a !== '__capture_only_intended__' && a !== '__end_flow__'
        })
        .map((e) => e.answer as string)

    await bot.handleMsg({ from: 'test-3', body: '1', name: 'Test' })
    const msgs1 = getMessages()
    expect(msgs1.some((m) => m.includes('Problemas de Internet'))).toBe(true)

    await bot.handleMsg({ from: 'test-3', body: '1' })
    const msgs2 = getMessages()
    expect(msgs2.length).toBeGreaterThan(msgs1.length)

    await bot.handleMsg({ from: 'test-3', body: '1' })
    const msgs3 = getMessages()
    expect(msgs3.length).toBeGreaterThan(msgs2.length)

    await bot.handleMsg({ from: 'test-3', body: '12345' })
    const msgs4 = getMessages()
    expect(msgs4.length).toBeGreaterThan(msgs3.length)
  })
})
