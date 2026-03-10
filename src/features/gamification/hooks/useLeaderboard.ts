import { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types/leaderboard.types';
import { leaderboardService } from '../services/leaderboard.service';
export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { leaderboardService.getWeekly().then(setEntries).finally(()=>setLoading(false)); }, []);
  return { entries, loading };
}
