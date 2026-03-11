import { describe, it, expect } from 'vitest'
import { calculateLevel, calculateNextLevelXP, calculateLevelProgress } from '@/lib/utils/xp.utils'

describe('calculateLevel', () => {
  it('should return level 1 for 0 XP', () => {
    expect(calculateLevel(0)).toBe(1)
  })

  it('should return level 1 for negative XP', () => {
    expect(calculateLevel(-100)).toBe(1)
  })

  it('should return level 2 at exactly 100 XP', () => {
    expect(calculateLevel(100)).toBe(2)
  })

  it('should return level 3 at exactly 400 XP', () => {
    expect(calculateLevel(400)).toBe(3)
  })

  it('should return level 4 at exactly 900 XP', () => {
    expect(calculateLevel(900)).toBe(4)
  })

  it('should return level 10 at exactly 8100 XP', () => {
    expect(calculateLevel(8100)).toBe(10)
  })

  it('should return level 1 for XP just below level 2 (99 XP)', () => {
    expect(calculateLevel(99)).toBe(1)
  })

  it('should return level 2 for XP just below level 3 (399 XP)', () => {
    expect(calculateLevel(399)).toBe(2)
  })

  it('should handle very large XP values', () => {
    expect(calculateLevel(1000000)).toBe(101)
  })
})

describe('calculateNextLevelXP', () => {
  it('should return 100 XP for level 1', () => {
    expect(calculateNextLevelXP(1)).toBe(100)
  })

  it('should return 400 XP for level 2', () => {
    expect(calculateNextLevelXP(2)).toBe(400)
  })

  it('should return 900 XP for level 3', () => {
    expect(calculateNextLevelXP(3)).toBe(900)
  })

  it('should return 8100 XP for level 9', () => {
    expect(calculateNextLevelXP(9)).toBe(8100)
  })
})

describe('calculateLevelProgress', () => {
  it('should return 0% at 0 XP (start of level 1)', () => {
    expect(calculateLevelProgress(0)).toBe(0)
  })

  it('should return 0% at start of level 2 (100 XP)', () => {
    // At 100 XP, user just reached level 2, so 0% progress into level 2
    expect(calculateLevelProgress(100)).toBe(0)
  })

  it('should return 50% at 50 XP (halfway through level 1)', () => {
    expect(calculateLevelProgress(50)).toBe(50)
  })

  it('should not exceed 100%', () => {
    expect(calculateLevelProgress(0)).toBeLessThanOrEqual(100)
    expect(calculateLevelProgress(10000000)).toBeLessThanOrEqual(100)
  })
})
