import { motion } from 'framer-motion';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { useAchievements } from '../hooks/useAchievements';

export function AchievementsPage() {
  const { achievements, loading } = useAchievements();
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Achievements</h1>
        <p className="text-sm text-gray-500">{achievements.filter(a=>a.isUnlocked).length}/{achievements.length} unlocked</p>
      </div>
      <div className="px-4 py-4 grid grid-cols-2 gap-3">
        {loading ? <p className="col-span-2 text-center text-gray-400 py-8">Loading...</p> : achievements.map((a,i) => (
          <motion.div key={a.id} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.04}}
            className={`bg-white rounded-2xl p-4 border text-center ${a.isUnlocked ? 'border-yellow-200' : 'border-gray-100 opacity-60'}`}>
            <div className={`text-3xl mb-2 ${!a.isUnlocked ? 'grayscale' : ''}`}>{a.icon}</div>
            <p className="font-bold text-sm text-gray-800">{a.title}</p>
            <p className="text-xs text-gray-500">{a.description}</p>
            {!a.isUnlocked && a.progress !== undefined && (
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{width:`${((a.progress??0)/(a.maxProgress??1))*100}%`}}/>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
}
