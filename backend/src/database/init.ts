import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './pool.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function initDatabase(): Promise<void> {
  try {
    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8')
    await pool.query(schema)
    console.log('✅ Schema aplicado correctamente')

    const seed = readFileSync(join(__dirname, 'seed.sql'), 'utf-8')
    await pool.query(seed)
    console.log('✅ Seed data insertado correctamente')
  } catch {
    console.warn('⚠️ PostgreSQL no disponible, usando datos en memoria')
  }
}
