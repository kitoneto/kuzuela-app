import { Link } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-primary-500 via-teal-500 to-blue-600 p-12 text-white">
        <Link to="/" className="flex items-center gap-2 mb-16">
          <span className="text-3xl">🌍</span>
          <span className="text-2xl font-bold">Kuzuela</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-6">
            Learn languages the smart way
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of learners mastering languages with AI-powered lessons, personalized tutoring and fun gamification.
          </p>
          <div className="space-y-4">
            {['🎯 Personalized learning paths', '🤖 AI Tutor available 24/7', '🏆 Compete on weekly leaderboards', '🌍 15+ languages available'].map(item => (
              <div key={item} className="flex items-center gap-3 text-sm">
                <span className="text-lg">{item.split(' ')[0]}</span>
                <span className="opacity-90">{item.split(' ').slice(1).join(' ')}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm opacity-60">© {new Date().getFullYear()} Kuzuela</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-2xl">🌍</span>
            <span className="text-xl font-bold text-gradient">Kuzuela</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-500 mb-8">Sign in to continue your learning journey.</p>
          <LoginForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
