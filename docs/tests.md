# Tests

El proyecto usa [Vitest](https://vitest.dev/) como framework de testing.

## Backend

### Tests de API

Verifican que todos los endpoints REST funcionen correctamente.

```bash
cd backend
npx vitest run        # Una sola ejecución
npx vitest            # Modo watch
```

**Cobertura:**
- `GET /api/clients/:id` - cliente existente y no existente
- `GET /api/clients/:id/history` - historial con tickets
- `GET /api/bills/client/:clientId` - facturas del cliente
- `GET /api/bills/client/:clientId/next` - próxima factura
- `GET /api/tickets/:id` - ticket existente y no existente
- `POST /api/tickets` - creación y validación de datos
- `GET /api/plans` - listado de planes
- `POST /api/plans/change` - cambio de plan
- `GET /api/outages` - cortes activos
- `POST /api/surveys` - creación de encuesta
- `POST /api/operator` - derivación a operador

## Bot

```bash
cd netsur-whatsap-bot
npm test               # Una sola ejecución
npx vitest             # Modo watch
```

### Tests unitarios (`services.test.ts`)

Verifican las funciones de validación y utilidades.

**Cobertura:**
- `isValidClientId` - validación de ID de cliente
- `isValidRating` - validación de calificación (1-5)
- `isValidTimeSlot` - validación de franja horaria
- `normalizeTimeSlot` - normalización de "manana" a "mañana"
- `extractClientId` - extracción de dígitos

### Tests de estructura de flujos (`flows.test.ts`)

Verifican que todos los nodos conversacionales tengan `capture: true` donde corresponde. Usan `toJson()` para inspeccionar los flujos sin necesidad de conexión externa.

**Cobertura:**
- `__capture_only_intended__` tiene `capture: true` — asegura que todos los nodos que esperan input del usuario capturen correctamente
- `__call_action__` no tiene `capture: true` — los nodos de acción inmediata no deben capturar
- `addAnswer` con callback tiene `capture: true` — los menús que capturan input directamente
- Cada flujo tiene al menos un nodo

### Tests de integración (`flows.test.ts`)

Usan `TestTool.TestProvider` + `TestTool.TestDB` (MemoryDB) para simular conversaciones completas sin infraestructura real.

**Cobertura:**
- Creación del bot sin errores
- Envío de mensaje inicial guarda en base de datos
- Opción de menú propaga el flujo al siguiente nodo
- Recorrido completo: menú → reclamo → número de cliente (internet flow)
