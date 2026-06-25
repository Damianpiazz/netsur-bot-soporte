# Flujos Conversacionales

El bot usa 10 flujos, cada uno en un archivo separado dentro de `src/flows/`.

## Regla de Capture

BuilderBot reutiliza `ctx.body` entre nodos del flujo. Para leer la respuesta del usuario después de una pregunta, el nodo debe tener `capture: true`:

- `addAnswer(texto, { capture: true }, callback)` — el callback recibe el input del usuario como `ctx.body`
- `addAction({ capture: true }, callback)` — igual, pero sin texto visible; útil después de `flowDynamic`
- `addAction(callback)` — se ejecuta **inmediatamente** sin esperar input; usa `ctx.body` del último mensaje capturado

**Importante:** si un `addAction(callback)` que lee `ctx.body` no tiene `{ capture: true }` después de una pregunta, recibirá datos del mensaje anterior, no de la respuesta actual.

**Convención del proyecto:** todo nodo que lea `ctx.body` (excepto validación en `fallBack`) debe tener `capture: true`.

## Verificación

```bash
cd netsur-whatsap-bot
npm test
```

Los tests de estructura revisan que todos los nodos cumplan esta regla.

## Flujo de Bienvenida (`welcome.flow.ts`)

Muestra el menú principal con 8 opciones.

**Palabras clave:** `hola`, `menu`, `inicio`, `netsur`, `buenos dias`

**Menú:**
```
1️⃣ Problemas de Internet
2️⃣ Facturación
3️⃣ Gestión de Servicios / Cambio de Plan
4️⃣ Estado de Reclamos
5️⃣ Hablar con un Operador
6️⃣ Estado del Servicio
7️⃣ Solicitar Visita Técnica
8️⃣ Historial de Consultas
```

## Diagnóstico de Internet (`internet.flow.ts`)

Guía al usuario para diagnosticar problemas de conexión.

**Subopciones:**
- Sin conexión → reinicio del módem → reclamo
- Internet lento → pasos de optimización → reclamo
- Cortes frecuentes → verifica incidencias activas → reclamo
- Luz roja en módem → revisión de fibra → reclamo

## Facturación (`billing.flow.ts`)

Consulta de facturas del cliente.

**Subopciones:**
1. Deuda pendiente
2. Próxima factura
3. Historial de facturas
4. Medios de pago

## Gestión de Servicios (`services.flow.ts`)

Consulta y cambio de plan de internet.

**Subopciones:**
1. Ver plan actual
2. Ver planes disponibles
3. Solicitar cambio de plan

## Reclamos (`claims.flow.ts`)

Consulta el estado de tickets existentes.

**Subopciones:**
1. Consultar por número de reclamo (ej: TK-1001)
2. Ver todos los reclamos del cliente

## Derivación a Operador (`operator.flow.ts`)

Escala el caso a un operador humano generando un ticket automático.

## Estado del Servicio (`status.flow.ts`)

Muestra las incidencias activas reportadas.

## Encuesta de Satisfacción (`survey.flow.ts`)

Solicita calificación del 1 al 5 y permite dejar comentarios.

## Visita Técnica (`visit.flow.ts`)

Solicita una visita técnica: dirección, franja horaria, descripción.

## Historial de Consultas (`history.flow.ts`)

Muestra el historial de tickets del cliente.
