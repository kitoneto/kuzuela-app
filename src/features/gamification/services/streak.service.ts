export class StreakService {
  async getStreak(_userId: string): Promise<number> { return 7; }
  async updateStreak(_userId: string): Promise<void> {}
}
export const streakService = new StreakService();
