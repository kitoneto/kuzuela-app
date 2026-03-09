import type { Achievement } from '../../types';
import { motion } from 'framer-motion';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const sizeClass = { sm: 'p-3', md: 'p-5', lg: 'p-6' }[size];
  const iconSize = { sm: 'text-2xl', md: 'text-3xl', lg: 'text-4xl' }[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${sizeClass} text-center`}
    >
      <div className={`${iconSize} mb-2`}>{achievement.icon}</div>
      <p className="font-semibold text-sm text-gray-900">{achievement.title}</p>
      <p className="text-xs text-gray-500 mt-1">{achievement.description}</p>
      <p className="text-xs text-primary-500 font-medium mt-2">
        {new Date(achievement.earned_at).toLocaleDateString()}
      </p>
    </motion.div>
  );
}
