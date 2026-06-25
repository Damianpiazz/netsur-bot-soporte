# Backend API

API REST simulada que provee datos al bot. Corre en `http://localhost:3001`.

## Endpoints

### Health

```
GET /api/health
```

**Respuesta:**
```json
{ "status": "ok", "service": "NetSur Backend API", "version": "1.0.0" }
```

### Clientes

```
GET /api/clients/:id
```

**Respuesta:**
```json
{
  "id": "1001",
  "name": "Juan Pérez",
  "address": "Av. Siempre Viva 742, La Plata",
  "phone": "2215550101",
  "documentNumber": "DNI 30123456",
  "planId": "plan-a",
  "planName": "NetSur 100Mb",
  "status": "active",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### Historial del cliente

```
GET /api/clients/:id/history
```

### Facturas

```
GET /api/bills/client/:clientId
GET /api/bills/client/:clientId/next
```

### Tickets / Reclamos

```
GET  /api/tickets/:id
POST /api/tickets
```

**POST /api/tickets:**
```json
{
  "clientId": "1001",
  "category": "internet",
  "description": "Sin conexión desde ayer"
}
```

### Planes

```
GET  /api/plans
GET  /api/plans/:id
POST /api/plans/change
```

**POST /api/plans/change:**
```json
{
  "clientId": "1001",
  "newPlanId": "plan-b"
}
```

### Cortes / Incidencias

```
GET /api/outages
GET /api/outages/zone/:zone
```

### Encuestas

```
POST /api/surveys
GET  /api/surveys/average
```

**POST /api/surveys:**
```json
{
  "clientId": "1001",
  "rating": 5,
  "comment": "Excelente atención"
}
```

### Visitas técnicas

```
POST /api/visits
GET  /api/visits/client/:clientId
```

**POST /api/visits:**
```json
{
  "clientId": "1001",
  "address": "Av. Siempre Viva 742",
  "timeSlot": "mañana",
  "description": "Módem no funciona"
}
```

### Derivación a operador

```
POST /api/operator
```

**POST /api/operator:**
```json
{
  "clientId": "1001",
  "category": "billing",
  "description": "Problema con factura duplicada"
}
```

## Datos Mock

El backend incluye datos de prueba precargados:

| Entidad | Cantidad | IDs de ejemplo |
|---------|----------|----------------|
| Clientes | 5 | `1001` a `1005` |
| Planes | 4 | `plan-a` a `plan-d` |
| Facturas | 8 | `fac-001` a `fac-008` |
| Tickets | 3 | `TK-1001` a `TK-1003` |
| Cortes | 2 | `out-001`, `out-002` |
