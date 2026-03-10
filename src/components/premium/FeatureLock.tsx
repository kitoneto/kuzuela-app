import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureLockProps {
  message?: string;
  showUpgrade?: boolean;
}

export function FeatureLock({ message = 'This feature requires a premium plan', showUpgrade = true }: FeatureLockProps) {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
      <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
        <Lock size={24} className="text-yellow-600" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">Premium Feature</h3>
      <p className="text-sm text-gray-500 mb-4 max-w-xs">{message}</p>
      {showUpgrade && (
        <Link
          to="/premium"
          className="px-5 py-2.5 bg-gradient-to-r from-primary-500 to-teal-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          Upgrade to Premium
        </Link>
      )}
    </div>
  );
}
