import { describe, it, expect } from 'vitest'
import { extractClientId, isValidClientId, isValidRating, isValidTimeSlot, normalizeTimeSlot } from '../utils/validators.js'

describe('Validators', () => {
  describe('isValidClientId', () => {
    it('accepts 4-10 digit numbers', () => {
      expect(isValidClientId('1001')).toBe(true)
      expect(isValidClientId('1234567890')).toBe(true)
    })

    it('rejects invalid formats', () => {
      expect(isValidClientId('abc')).toBe(false)
      expect(isValidClientId('12')).toBe(false)
      expect(isValidClientId('')).toBe(false)
    })
  })

  describe('isValidRating', () => {
    it('accepts 1-5', () => {
      expect(isValidRating('1')).toBe(true)
      expect(isValidRating('5')).toBe(true)
    })

    it('rejects outside range', () => {
      expect(isValidRating('0')).toBe(false)
      expect(isValidRating('6')).toBe(false)
      expect(isValidRating('abc')).toBe(false)
    })
  })

  describe('isValidTimeSlot', () => {
    it('accepts valid slots', () => {
      expect(isValidTimeSlot('mañana')).toBe(true)
      expect(isValidTimeSlot('tarde')).toBe(true)
      expect(isValidTimeSlot('manana')).toBe(true)
    })

    it('rejects invalid slots', () => {
      expect(isValidTimeSlot('noche')).toBe(false)
      expect(isValidTimeSlot('')).toBe(false)
    })
  })

  describe('normalizeTimeSlot', () => {
    it('normalizes "manana" to "mañana"', () => {
      expect(normalizeTimeSlot('manana')).toBe('mañana')
      expect(normalizeTimeSlot('mañana')).toBe('mañana')
      expect(normalizeTimeSlot('tarde')).toBe('tarde')
    })
  })

  describe('extractClientId', () => {
    it('extracts only digits', () => {
      expect(extractClientId('1001')).toBe('1001')
      expect(extractClientId('CL-1001')).toBe('1001')
    })
  })
})
