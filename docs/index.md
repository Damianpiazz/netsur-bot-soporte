# NetSurBot

Asistente de Soporte Técnico y Atención al Cliente por WhatsApp para NetSur Conectividad.

## Arquitectura

```text
WhatsApp
    │
    ▼
BuilderBot (netsur-whatsap-bot/)
    │  Flujos conversacionales
    │  Gestión de estado
    │  Validaciones
    │
    ▼
Backend API (backend/)
    │  Clientes, Facturas, Tickets
    │  Planes, Cortes, Visitas
    │
    ▼
PostgreSQL
    │  Datos persistentes
```

## Estructura del proyecto

```
netsur-bot-soporte/
├── backend/                # API REST simulada
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       ├── data/seed.ts
│       ├── routes/
│       └── types/
├── netsur-whatsap-bot/     # Bot BuilderBot
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── rollup.config.js
│   └── src/
│       ├── app.ts
│       ├── config/
│       ├── flows/
│       ├── services/
│       ├── types/
│       └── utils/
├── docs/                   # Documentación
├── .env.example
├── docker-compose.yml
└── README.md
```

## Requisitos

- Node.js 20+
- npm / pnpm
- Git
- Docker y Docker Compose (opcional)
- PostgreSQL (si no se usa Docker)

## Inicio rápido

### Con Docker (recomendado)

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd netsur-bot-soporte

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Levantar todo
docker compose up -d

# 4. Ver logs
docker compose logs -f
```

### Sin Docker (desarrollo local)

```bash
# 1. Configurar PostgreSQL y crear base de datos
#    Crear base: netsurbot

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con los datos de tu PostgreSQL local

# 3. Iniciar backend
cd backend
npm install
npm run dev
# → http://localhost:3001

# 4. En otra terminal, iniciar el bot
cd netsur-whatsap-bot
npm install
npm run dev
```

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `POSTGRES_DB_HOST` | Host de PostgreSQL | `postgres` |
| `POSTGRES_DB_PORT` | Puerto de PostgreSQL | `5432` |
| `POSTGRES_DB_NAME` | Nombre de la base | `netsurbot` |
| `POSTGRES_DB_USER` | Usuario de la base | `netsur` |
| `POSTGRES_DB_PASSWORD` | Contraseña | `changeme` |
| `BACKEND_PORT` | Puerto del backend | `3001` |
| `BOT_PORT` | Puerto del bot | `3008` |
| `BACKEND_URL` | URL del backend (el bot la usa) | `http://backend:3001` |
