# Desarrollo

## Comandos

### Backend

```bash
cd backend

npm install          # Instalar dependencias
npm run dev          # Desarrollo con hot-reload (puerto 3001)
npm start            # Producción
npm run build        # Compilar TypeScript
```

### Bot

```bash
cd netsur-whatsap-bot

npm install          # Instalar dependencias
npm run dev          # Desarrollo con hot-reload (puerto 3008)
npm start            # Producción (requiere build previo)
npm run build        # Compilar con Rollup
npm run lint         # ESLint
npm test             # Tests unitarios + integración (Vitest)
```

## Docker

```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs
docker compose logs -f

# Detener
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Reconstruir imágenes
docker compose build --no-cache
```

## Agregar un nuevo flujo

1. Crear archivo en `src/flows/<nombre>.flow.ts`

```ts
import { addKeyword } from '@builderbot/bot'
import type { BaileysProvider as Provider } from '@builderbot/provider-baileys'
import type { PostgreSQLAdapter as Database } from '@builderbot/database-postgres'
import { welcomeFlow } from './welcome.flow.js'

export const myFlow = addKeyword<Provider, Database>(['keyword1', 'keyword2'])
  .addAnswer('Respuesta del bot')
  .addAnswer('¿Pregunta?', { capture: true }, async (ctx, { state, flowDynamic, gotoFlow, fallBack }) => {
    const respuesta = ctx.body.trim()
    await state.update({ key: respuesta })
  })
  .addAction(async (_, { flowDynamic, state, gotoFlow }) => {
    const data = state.get('key')
    await flowDynamic(`Respondiste: ${data}`)
    return gotoFlow(welcomeFlow)
  })

export default myFlow
```

2. Importar y agregar en `src/flows/index.ts`

```ts
import { myFlow } from './my.flow.js'

export const adapterFlow = createFlow([
  // ... otros flujos
  myFlow,
])
```

## Agregar un endpoint al backend

1. Crear archivo en `backend/src/routes/<recurso>.ts`

```ts
import { Router } from 'express'
import { datos } from '../data/seed.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json(datos)
})

export default router
```

2. Registrar en `backend/src/index.ts`

```ts
import recursoRouter from './routes/<recurso>.js'
app.use('/api/<recurso>', recursoRouter)
```
