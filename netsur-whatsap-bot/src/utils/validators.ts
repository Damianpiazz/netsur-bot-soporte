export function isValidClientId(input: string): boolean {
  return /^\d{4,10}$/.test(input.trim())
}

export function isValidPhoneNumber(input: string): boolean {
  return /^\+?\d{7,15}$/.test(input.trim())
}

export function isValidRating(input: string): boolean {
  const num = Number(input.trim())
  return Number.isInteger(num) && num >= 1 && num <= 5
}

export function extractClientId(input: string): string {
  return input.trim().replace(/\D/g, '')
}

export function isValidTimeSlot(input: string): boolean {
  const validSlots = ['mañana', 'tarde', 'manana']
  return validSlots.includes(input.trim().toLowerCase())
}

export function normalizeTimeSlot(input: string): string {
  const val = input.trim().toLowerCase()
  if (val === 'manana') return 'mañana'
  return val
}
