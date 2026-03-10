import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌍</span>
              <span className="text-lg font-bold text-gradient">Kuzuela</span>
            </div>
            <p className="text-sm text-gray-500">Language learning reimagined for Africa and beyond.</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-800 mb-3">Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Courses</Link></li>
              <li><Link to="/tutor" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">AI Tutor</Link></li>
              <li><Link to="/leaderboard" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-800 mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">About</Link></li>
              <li><Link to="/premium" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-800 mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@kuzuela.app" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Kuzuela. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Privacy</Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
