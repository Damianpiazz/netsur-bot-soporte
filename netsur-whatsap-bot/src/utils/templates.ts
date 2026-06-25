import { config } from '../config/index.js'

export const WELCOME_MESSAGE = `🙌 Hola! Soy *${config.botName}*, el asistente virtual de *${config.companyName}*.

Elegí una opción para continuar:

1️⃣ *Problemas de Internet*
2️⃣ *Facturación*
3️⃣ *Gestión de Servicios / Cambio de Plan*
4️⃣ *Estado de Reclamos*
5️⃣ *Hablar con un Operador*
6️⃣ *Estado del Servicio*
7️⃣ *Solicitar Visita Técnica*
8️⃣ *Historial de Consultas*

O simplemente escribí tu consulta con tus palabras.`

export function formatClientInfo(client: { name: string; planName: string; status: string }): string {
  return `👤 *Cliente:* ${client.name}
📡 *Plan:* ${client.planName}
📊 *Estado:* ${client.status === 'active' ? '✅ Activo' : '⛔ Suspendido'}`
}

export function formatBill(bill: { period: string; amount: number; dueDate: string; paid: boolean; paidAt?: string }): string {
  const status = bill.paid
    ? `✅ *Pagada* el ${bill.paidAt ? new Date(bill.paidAt).toLocaleDateString('es-AR') : '-'}`
    : `⏳ *Pendiente* - Vence: ${new Date(bill.dueDate).toLocaleDateString('es-AR')}`

  return `📄 *Factura* - ${bill.period}
💰 *Importe:* $${bill.amount.toLocaleString('es-AR')}
📅 *Vencimiento:* ${new Date(bill.dueDate).toLocaleDateString('es-AR')}
${status}`
}

export function formatTicket(ticket: { id: string; category: string; status: string; description: string; createdAt: string; priority: string }): string {
  const statusMap: Record<string, string> = {
    open: '🟡 Abierto',
    in_progress: '🔵 En progreso',
    resolved: '🟢 Resuelto',
    closed: '⚪ Cerrado',
  }
  const categoryMap: Record<string, string> = {
    internet: 'Internet',
    billing: 'Facturación',
    technical_visit: 'Visita Técnica',
    commercial: 'Comercial',
    other: 'Otro',
  }

  return `🎫 *${ticket.id}*
📂 *Categoría:* ${categoryMap[ticket.category] || ticket.category}
📊 *Estado:* ${statusMap[ticket.status] || ticket.status}
🏷️ *Prioridad:* ${ticket.priority === 'high' ? '🔴 Alta' : ticket.priority === 'medium' ? '🟡 Media' : '🟢 Baja'}
📝 *Descripción:* ${ticket.description}
📅 *Creado:* ${new Date(ticket.createdAt).toLocaleString('es-AR')}`
}

export function formatPlan(plan: { name: string; speed: string; price: number; description: string; features: string[] }): string {
  return `📡 *${plan.name}*
⚡ *Velocidad:* ${plan.speed}
💰 *Precio:* $${plan.price.toLocaleString('es-AR')}/mes
📖 ${plan.description}

✨ *Incluye:*
${plan.features.map(f => `  ✅ ${f}`).join('\n')}`
}

export function formatOutage(outage: { zone: string; description: string; startTime: string; estimatedEndTime?: string }): string {
  return `⚠️ *Incidencia en ${outage.zone}*
📝 ${outage.description}
🕐 *Inicio:* ${new Date(outage.startTime).toLocaleString('es-AR')}
${outage.estimatedEndTime ? `🕐 *Estimado de resolución:* ${new Date(outage.estimatedEndTime).toLocaleString('es-AR')}` : ''}`
}

export function formatSurveyPrompt(): string {
  return `📝 *Encuesta de Satisfacción*

¿Cómo calificarías tu experiencia?

1 ⭐ - Muy mala
2 ⭐ - Mala
3 ⭐ - Regular
4 ⭐ - Buena
5 ⭐ - Excelente

*Respondé con un número del 1 al 5:*`
}

export function formatVisitRequest(clientName: string): string {
  return `🔧 *Solicitud de Visita Técnica*

Vamos a coordinar una visita para ${clientName}.

Por favor indicá:
1️⃣ *Dirección* donde necesitás la visita
2️⃣ *Franja horaria* preferida (mañana / tarde)
3️⃣ *Descripción* del problema`
}

export const INTERNET_MENU = `🌐 *Problemas de Internet*

Seleccioná tu situación:

1️⃣ *Sin conexión*
2️⃣ *Internet lento*
3️⃣ *Cortes frecuentes*
4️⃣ *Luz roja en el módem*
5️⃣ *Volver al menú principal*`

export const BILLING_MENU = `🧾 *Facturación*

Seleccioná una opción:

1️⃣ *Consultar deuda pendiente*
2️⃣ *Ver próxima factura*
3️⃣ *Historial de facturas*
4️⃣ *Medios de pago*
5️⃣ *Volver al menú principal*`

export const SERVICES_MENU = `📡 *Gestión de Servicios*

Seleccioná una opción:

1️⃣ *Ver mi plan actual*
2️⃣ *Ver planes disponibles*
3️⃣ *Solicitar cambio de plan*
4️⃣ *Volver al menú principal*`

export const CLAIM_MENU = `🎫 *Estado de Reclamos*

1️⃣ *Consultar reclamo por número*
2️⃣ *Ver mis reclamos*
3️⃣ *Volver al menú principal*`

export const OPERATOR_MENU = `👤 *Derivación a Operador*

Decinos brevemente tu consulta y te conectamos con un operador.

Escribí el motivo de tu contacto (ej: "problema con factura", "reclamo técnico", etc.):`

export const PAYMENT_METHODS = `💳 *Medios de Pago*

Podés pagar tu factura de las siguientes formas:

🏦 *Transferencia Bancaria*
  CBU: 0000003100012345678901
  Titular: NetSur Conectividad

💻 *Mercado Pago*
  A través de la app de Mercado Pago

📍 *Pago Fácil / Rapipago*
  Con el código de barras de tu factura

💳 *Tarjeta de crédito/débito*
  En nuestras oficinas o vía link de pago`
