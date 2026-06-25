import { config } from '../config/index.js'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${config.backendUrl}/api${path}`
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Error de conexión' }))
    throw new Error(error.error ?? `HTTP ${res.status}`)
  }

  return res.json()
}

export function get<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function post<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
