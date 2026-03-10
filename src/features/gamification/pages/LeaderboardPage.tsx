import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardTable } from '../components/LeaderboardTable';
export function LeaderboardPage() {
  const { entries, loading } = useLeaderboard();
  const me = entries.find(e => e.isCurrentUser);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 px-4 pt-12 pb-8 text-white text-center">
        <Trophy className="h-10 w-10 mx-auto mb-2" />
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        <p className="text-yellow-100 text-sm">Weekly Rankings</p>
        {me && <div className="mt-3 bg-white/20 rounded-xl px-4 py-2 inline-block"><span className="font-bold">Your rank: #{me.rank}</span> · {me.weeklyXP} XP this week</div>}
      </div>
      <div className="px-4 py-4">
        {loading ? <p className="text-center text-gray-400 py-8">Loading...</p> : (
          <motion.div initial={{opacity:0}} animate={{opacity:1}}><LeaderboardTable entries={entries}/></motion.div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
