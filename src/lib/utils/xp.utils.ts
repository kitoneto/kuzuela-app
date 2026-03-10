/**
 * Calculate level from XP
 * Formula: level = floor(sqrt(xp / 100)) + 1
 *
 * Level 1 = 0 XP
 * Level 2 = 100 XP
 * Level 3 = 400 XP
 * Level 4 = 900 XP
 * Level 10 = 8100 XP
 */
export function calculateLevel(xp: number): number {
  if (xp < 0) return 1
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

/**
 * Calculate XP needed to reach the next level
 */
export function calculateNextLevelXP(currentLevel: number): number {
  return currentLevel * currentLevel * 100
}

/**
 * Calculate XP progress percentage toward the next level
 */
export function calculateLevelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp)
  const currentLevelXP = (currentLevel - 1) * (currentLevel - 1) * 100
  const nextLevelXP = calculateNextLevelXP(currentLevel)
  const xpInCurrentLevel = xp - currentLevelXP
  const xpNeededForLevel = nextLevelXP - currentLevelXP
  return Math.min(Math.round((xpInCurrentLevel / xpNeededForLevel) * 100), 100)
}
