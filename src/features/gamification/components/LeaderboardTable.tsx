import type { LeaderboardEntry } from '../types/leaderboard.types';
const medals: Record<number,string> = {1:'🥇',2:'🥈',3:'🥉'};
export function LeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  return (
    <div className="space-y-2">
      {entries.map(e => (
        <div key={e.id} className={`flex items-center gap-3 p-3 rounded-xl ${e.isCurrentUser ? 'bg-purple-50 border border-purple-200' : 'bg-white border border-gray-100'}`}>
          <span className="w-8 text-center font-bold text-gray-500">{medals[e.rank] ?? `#${e.rank}`}</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-indigo-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {e.displayName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`font-semibold truncate ${e.isCurrentUser ? 'text-purple-700' : 'text-gray-800'}`}>{e.displayName}{e.isCurrentUser ? ' (You)' : ''}</p>
            <p className="text-xs text-gray-400">{e.totalXP.toLocaleString()} total XP</p>
          </div>
          <span className="font-bold text-purple-600">{e.weeklyXP} XP</span>
        </div>
      ))}
    </div>
  );
}
