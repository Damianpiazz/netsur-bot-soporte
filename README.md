# netsur-bot-soporte

## Asistente de Soporte Técnico y Atención al Cliente por WhatsApp

### Descripción

NetSurBot es un asistente virtual desarrollado para **NetSur Conectividad**, una empresa ficticia proveedora de internet por fibra óptica que brinda servicios a clientes residenciales y comerciales.

El objetivo del proyecto es automatizar la atención de consultas frecuentes mediante WhatsApp, reduciendo los tiempos de respuesta y permitiendo que el equipo de soporte se concentre en incidencias complejas que requieren intervención humana.

---

# Historia del Proyecto

## Contexto

NetSur Conectividad experimentó un crecimiento acelerado durante los últimos años.

A medida que aumentó la cantidad de clientes, también creció el volumen de consultas recibidas diariamente por WhatsApp.

El equipo de soporte detectó que gran parte de las conversaciones correspondían a situaciones repetitivas:

- Clientes sin conexión a internet.
- Consultas sobre facturación.
- Solicitudes de cambio de plan.
- Verificación de pagos.
- Seguimiento de reclamos.
- Solicitudes para hablar con un operador.

Aunque muchas de estas consultas podían resolverse mediante procedimientos simples, cada una requería la intervención de un agente.

Como consecuencia:

- Los tiempos de espera aumentaron.
- Los operadores dedicaban gran parte de su jornada a responder preguntas repetitivas.
- Los casos urgentes se mezclaban con consultas administrativas.
- La experiencia del cliente comenzaba a deteriorarse.

---

## El Desafío

La empresa necesitaba una solución capaz de:

- Atender clientes las 24 horas.
- Resolver consultas frecuentes automáticamente.
- Guiar al usuario mediante flujos conversacionales.
- Registrar incidencias.
- Escalar casos complejos a operadores humanos.
- Reducir la carga operativa del equipo de soporte.

---

## La Solución

Para resolver esta problemática se desarrolló **NetSurBot**, un asistente virtual basado en WhatsApp utilizando BuilderBot.

El bot funciona como el primer punto de contacto entre la empresa y sus clientes.

Su objetivo es identificar rápidamente la necesidad del usuario, ofrecer soluciones automáticas cuando sea posible y derivar al área correspondiente cuando la situación lo requiera.

---

# Flujo Principal

```text
Cliente
   │
   ▼
Menú Principal
   │
   ├── Problemas de Internet
   │
   ├── Facturación
   │
   ├── Gestión de Servicios
   │
   ├── Estado de Reclamos
   │
   └── Hablar con Operador
```

---

# Casos de Uso

## 1. Diagnóstico de Problemas de Internet

El bot guía al usuario mediante una serie de preguntas para identificar el origen del problema.

### Ejemplo

Cliente:

> No tengo internet

Bot:

> Vamos a ayudarte.
>
> ¿Qué problema estás experimentando?
>
> 1. Sin conexión
> 2. Internet lento
> 3. Cortes frecuentes
> 4. Luz roja en el módem

A partir de las respuestas, el bot puede:

- Sugerir reinicios del equipo.
- Verificar incidencias masivas.
- Generar un reclamo técnico.
- Escalar el caso a soporte especializado.

---

## 2. Consultas de Facturación

Permite obtener información administrativa sin necesidad de un operador.

### Funcionalidades

- Consultar deuda pendiente.
- Ver fecha de vencimiento.
- Descargar factura.
- Obtener medios de pago.
- Solicitar comprobantes.

### Ejemplo

Cliente:

> Facturación

Bot:

> Por favor ingresa tu número de cliente.

Bot:

> Tu próxima factura vence el 15/07.
>
> Importe: $24.500

---

## 3. Seguimiento de Reclamos

Los usuarios pueden consultar el estado de incidencias previamente registradas.

### Ejemplo

Cliente:

> Estado de reclamo

Bot:

> Reclamo #5487
>
> Estado: En revisión por soporte técnico.

---

## 4. Cambio de Plan

Permite explorar y solicitar modificaciones del servicio contratado.

### Funcionalidades

- Consultar planes disponibles.
- Solicitar upgrade.
- Solicitar downgrade.
- Registrar interés comercial.

---

## 5. Escalamiento a Operador

Cuando el bot no puede resolver una consulta, recopila información relevante y la envía al equipo humano.

### Información recopilada

- Nombre del cliente.
- Número de cliente.
- Categoría del problema.
- Descripción del incidente.
- Fecha y hora del contacto.

Posteriormente se genera un ticket para seguimiento.

---

# Funcionalidades Principales

## Atención Automatizada

- Menú principal interactivo.
- Navegación guiada.
- Respuestas automáticas.
- Validación de datos.

---

## Gestión de Estado Conversacional

El bot mantiene contexto durante toda la conversación.

Por ejemplo:

```text
Cliente: No tengo internet

Bot: ¿Cuál es tu número de cliente?

Cliente: 45872

Bot: Gracias.
¿Desde cuándo tienes el problema?
```

---

## Sistema de Tickets

Cada incidencia puede registrarse automáticamente.

Información almacenada:

- Cliente.
- Categoría.
- Prioridad.
- Estado.
- Fecha de creación.

---

## Derivación Inteligente

El bot determina cuándo un caso requiere intervención humana.

Tipos de derivación:

- Soporte técnico.
- Facturación.
- Área comercial.
- Atención al cliente.

---

## Notificaciones Internas

Cuando se crea un ticket:

- Se registra en la base de datos.
- Se notifica al equipo correspondiente.
- Se asigna prioridad.

---

# Funcionalidades Adicionales

## Consulta de Estado del Servicio

Permite verificar si existe una incidencia general en una zona determinada.

Ejemplo:

> Actualmente existe una interrupción del servicio en la zona de La Plata.
>
> Nuestro equipo técnico ya se encuentra trabajando para resolverla.

---

## Encuestas de Satisfacción

Al finalizar cada interacción:

```text
¿Cómo calificarías tu experiencia?

1 ⭐
2 ⭐
3 ⭐
4 ⭐
5 ⭐
```

La información queda almacenada para análisis posterior.

---

## Historial de Consultas

Permite visualizar las últimas solicitudes realizadas por un cliente.

Ejemplo:

```text
Últimos contactos:

- Reclamo técnico #5487
- Consulta de factura
- Cambio de plan solicitado
```

---

## Recordatorios de Pago

El sistema puede enviar mensajes automáticos antes del vencimiento.

Ejemplo:

```text
Hola Juan.

Te recordamos que tu factura vence mañana.

Importe: $24.500
```

---

## Solicitud de Visita Técnica

Los clientes pueden solicitar una visita sin necesidad de llamar por teléfono.

El bot recopila:

- Dirección.
- Franja horaria.
- Descripción del problema.

---

## Detección de Palabras Clave

Incluso si el usuario no utiliza el menú principal, el bot puede identificar intenciones.

Ejemplos:

```text
"No tengo internet"
"Pagar factura"
"Hablar con alguien"
"Cambiar plan"
```

---

## Dashboard Administrativo (Futuro)

Posibilidad de incorporar un panel web para visualizar:

- Conversaciones activas.
- Tickets generados.
- Reclamos por categoría.
- Métricas de satisfacción.
- Tiempo promedio de respuesta.

---

# Arquitectura

```text
WhatsApp
    │
    ▼
BuilderBot
    │
    ├── Flujos Conversacionales
    ├── Gestión de Estado
    ├── Validaciones
    │
    ▼
Base de Datos
    │
    ├── Clientes
    ├── Tickets
    ├── Conversaciones
    └── Métricas
```

---

# Tecnologías

- BuilderBot
- Node.js
- TypeScript
- WhatsApp Provider
- PostgreSQL / SQLite
- Docker
- REST APIs

---

# Beneficios Esperados

## Para los Clientes

- Atención inmediata.
- Disponibilidad 24/7.
- Menor tiempo de espera.
- Resolución más rápida de problemas.

## Para NetSur

- Reducción de carga operativa.
- Menor volumen de consultas manuales.
- Mejor organización de incidencias.
- Mayor satisfacción del cliente.
- Escalabilidad del servicio de soporte.

---

# Objetivo del Proyecto

Demostrar cómo un bot conversacional puede convertirse en la primera línea de atención de una empresa de servicios, automatizando procesos repetitivos, mejorando la experiencia del cliente y optimizando el trabajo del equipo de soporte.

NetSurBot busca representar un caso de uso realista y escalable para empresas de telecomunicaciones, internet, energía, seguros o cualquier organización que gestione un gran volumen de consultas recurrentes a través de WhatsApp.