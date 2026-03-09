import { Link } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

export function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-purple-500 via-primary-500 to-teal-500 p-12 text-white">
        <Link to="/" className="flex items-center gap-2 mb-16">
          <span className="text-3xl">🌍</span>
          <span className="text-2xl font-bold">Kuzuela</span>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl font-extrabold leading-tight mb-6">
            Start your language journey today
          </h1>
          <p className="text-lg opacity-90 mb-8">
            Free to get started. Learn at your own pace with engaging lessons designed for real-world communication.
          </p>
          <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50K+', label: 'Learners' },
                { value: '15+', label: 'Languages' },
                { value: '1000+', label: 'Lessons' },
                { value: '4.9★', label: 'Rating' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm opacity-70">{stat.label}</p>
                </div>
              ))}
            </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-500 mb-8">It's free! Start learning in minutes.</p>
          <RegisterForm />
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
