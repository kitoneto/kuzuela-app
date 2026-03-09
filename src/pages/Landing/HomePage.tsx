import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, MessageCircle, Trophy, Zap } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import { useCourses } from '../../hooks/useCourses';
import { CourseCard } from '../../components/course/CourseCard';

export function HomePage() {
  const { courses } = useCourses();
  const featuredCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-500 via-teal-500 to-blue-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🌍 Language Learning for Africa & Beyond
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              Learn Languages<br />
              <span className="text-yellow-300">the Smart Way</span>
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              AI-powered lessons, personalized tutoring, and fun gamification to help you master any language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
              >
                Start for Free <ArrowRight size={18} />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/80 text-sm"
          >
            {[
              { value: '50,000+', label: 'Active Learners' },
              { value: '15+', label: 'Languages' },
              { value: '4.9 ★', label: 'App Rating' },
              { value: '98%', label: 'Satisfaction' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">Why Kuzuela?</h2>
          <p className="text-center text-gray-500 mb-12">Everything you need to learn a language effectively</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen size={24} className="text-primary-600" />, title: 'Structured Lessons', desc: 'Progressive curriculum with vocabulary, dialogue, and exercises', bg: 'bg-primary-50' },
              { icon: <MessageCircle size={24} className="text-teal-600" />, title: 'AI Tutor', desc: 'Get help 24/7 from our intelligent language tutor', bg: 'bg-teal-50' },
              { icon: <Trophy size={24} className="text-yellow-600" />, title: 'Gamification', desc: 'Earn XP, maintain streaks, and compete on leaderboards', bg: 'bg-yellow-50' },
              { icon: <Zap size={24} className="text-purple-600" />, title: 'Fast Progress', desc: 'Learn at your own pace with personalized learning paths', bg: 'bg-purple-50' },
            ].map(f => (
              <motion.div
                key={f.title}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      {featuredCourses.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
              <Link to="/courses" className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm">
                All courses <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary-600 to-teal-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-lg opacity-90 mb-8">Join thousands of learners mastering languages with Kuzuela. Free to start, no credit card required.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Get Started Free <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
