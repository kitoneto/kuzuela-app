import { AppLayout } from '../../components/layout/AppLayout';
import { LeaderboardTable } from '../../components/gamification/LeaderboardTable';
import { useGamification } from '../../hooks/useGamification';
import { useAuth } from '../../hooks/useAuth';
import { Loading } from '../../components/common/Loading';
import { Trophy } from 'lucide-react';

export function LeaderboardPage() {
  const { user } = useAuth();
  const { leaderboard, loading } = useGamification();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-yellow-100 flex items-center justify-center">
            <Trophy size={22} className="text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leaderboard</h1>
            <p className="text-sm text-gray-500">Weekly XP rankings</p>
          </div>
        </div>

        {/* Week banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-5 mb-6 text-white text-center">
          <p className="text-sm font-medium opacity-90 mb-1">This Week's Competition</p>
          <p className="text-2xl font-bold">Week {Math.ceil(new Date().getDate() / 7)} Rankings</p>
          <p className="text-sm opacity-80 mt-1">Earn XP by completing lessons to climb the leaderboard</p>
        </div>

        {loading ? (
          <Loading text="Loading rankings..." />
        ) : (
          <LeaderboardTable entries={leaderboard} currentUserId={user?.id} />
        )}
      </div>
    </AppLayout>
  );
}
