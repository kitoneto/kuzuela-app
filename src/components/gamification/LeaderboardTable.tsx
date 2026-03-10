import type { LeaderboardEntry } from '../../types';
import { Crown, Medal } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
}

const rankIcons = {
  1: <Crown size={18} className="text-yellow-500" />,
  2: <Medal size={18} className="text-gray-400" />,
  3: <Medal size={18} className="text-amber-600" />,
};

export function LeaderboardTable({ entries, currentUserId }: LeaderboardTableProps) {
  return (
    <div className="space-y-2">
      {entries.map((entry, i) => {
        const isCurrentUser = entry.user_id === currentUserId;
        const rank = entry.rank ?? i + 1;

        return (
          <div
            key={entry.id}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all
              ${isCurrentUser
                ? 'bg-primary-50 border-2 border-primary-200'
                : 'bg-white border border-gray-100 hover:border-gray-200'
              }`}
          >
            {/* Rank */}
            <div className="w-8 flex items-center justify-center">
              {rankIcons[rank as keyof typeof rankIcons] ?? (
                <span className="text-sm font-bold text-gray-400">#{rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
              ${isCurrentUser ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {entry.profile?.full_name?.[0] ?? entry.profile?.email?.[0]?.toUpperCase() ?? '?'}
            </div>

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className={`font-semibold text-sm ${isCurrentUser ? 'text-primary-700' : 'text-gray-900'}`}>
                {entry.profile?.full_name ?? 'Anonymous'}
                {isCurrentUser && <span className="ml-1 text-xs text-primary-500">(you)</span>}
              </p>
              <p className="text-xs text-gray-400">Streak: {entry.profile?.streak_days ?? 0} days</p>
            </div>

            {/* XP */}
            <div className="text-right">
              <p className="font-bold text-primary-600">{entry.xp_this_week.toLocaleString()}</p>
              <p className="text-xs text-gray-400">XP this week</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
