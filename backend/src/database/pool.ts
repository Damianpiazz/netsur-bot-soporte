import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  host: process.env.POSTGRES_DB_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_DB_PORT) ?? 5432,
  database: process.env.POSTGRES_DB_NAME ?? 'netsurbot',
  user: process.env.POSTGRES_DB_USER ?? 'netsur',
  password: process.env.POSTGRES_DB_PASSWORD ?? 'changeme',
})

pool.on('error', (err) => {
  console.error('Error inesperado en el pool de PostgreSQL:', err)
})
