# Panel de Administración (Dashboard)

El backend incluye un panel de administración web con Bulma CSS para monitorear el sistema.

## Acceso

```
http://localhost:3001/admin/
```

## Secciones

### Dashboard
Resumen con estadísticas: clientes, tickets abiertos, cortes activos, encuestas.

### Clientes
- Búsqueda por ID, nombre o teléfono
- Listado completo de clientes registrados
- Vista detallada con datos de contacto y plan

### Tickets / Reclamos
- Búsqueda por número de ticket o ID de cliente
- Filtros por estado (todos, abiertos, en progreso, resueltos)
- Vista detallada con prioridad, categoría y fechas

### Cortes e Incidencias
- Listado de incidencias activas
- Información de zona, descripción y tiempo estimado de resolución

### Encuestas de Satisfacción
- Promedio general de calificaciones
- Total de encuestas registradas

### Visitas Técnicas
- Solicitudes de visita técnica pendientes y programadas

### Plantillas de Mensajes
- Vista previa de todas las plantillas que usa el bot en las conversaciones
- Incluye menú principal, facturación, diagnóstico de internet, etc.

## Tecnología

- **Bulma CSS 1.0.2** para los estilos
- **Font Awesome 6** para los iconos
- **Vanilla JS** para las interacciones (sin framework)
- Las páginas consumen la API REST del backend

## Desarrollo

Las páginas están en `backend/src/admin/` como archivos HTML estáticos.
Para agregar una nueva sección:

1. Crear el HTML en `backend/src/admin/`
2. Agregar enlace en el menú lateral de todas las páginas
