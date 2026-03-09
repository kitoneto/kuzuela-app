import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="text-7xl mb-6">🗺️</div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">404</h1>
      <h2 className="text-xl font-semibold text-gray-700 mb-2">Page not found</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Looks like you've ventured off the map. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        <Home size={18} />
        Go Home
      </Link>
    </div>
  );
}
