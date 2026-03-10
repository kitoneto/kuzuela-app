import { useState, type FormEvent } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useProfile } from '../../hooks/useProfile';
import { useXP } from '../../hooks/useXP';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useToast } from '../../components/common/Toast';
import { XPBar, HeartsDisplay, StreakDisplay } from '../../components/gamification/StreakDisplay';
import { Camera, User } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const { xp, level, progressPercent } = useXP();
  const { success, error: showError } = useToast();
  const [name, setName] = useState(profile?.full_name ?? '');
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile({ full_name: name });
      success('Profile updated!');
      setEditing(false);
    } catch {
      showError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() ?? 'U';

  const tierColors = { free: 'bg-gray-100 text-gray-600', pro: 'bg-blue-100 text-blue-700', plus: 'bg-yellow-100 text-yellow-700' };
  const tier = profile?.subscription_tier ?? 'free';

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="avatar" className="w-full h-full rounded-full object-cover" />
                ) : initials}
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                <Camera size={14} className="text-gray-500" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              {editing ? (
                <form onSubmit={handleSave} className="space-y-3">
                  <Input
                    label="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    leftIcon={<User size={16} />}
                  />
                  <div className="flex gap-3">
                    <Button type="submit" size="sm" loading={loading}>Save</Button>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-bold text-gray-900">{profile?.full_name ?? 'User'}</h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full uppercase ${tierColors[tier]}`}>
                      {tier}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{user?.email}</p>
                  <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { emoji: '⭐', label: 'XP', value: xp.toLocaleString() },
            { emoji: '🔥', label: 'Streak', value: `${profile?.streak_days ?? 0}d` },
            { emoji: '🎓', label: 'Level', value: level },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <p className="text-xl mb-1">{s.emoji}</p>
              <p className="font-bold text-gray-900 text-lg">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Detailed stats */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Level Progress</h3>
            <XPBar xp={xp} level={level} progressPercent={progressPercent} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Current Streak</h3>
              <StreakDisplay days={profile?.streak_days ?? 0} size="md" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm">Hearts</h3>
              <HeartsDisplay hearts={profile?.hearts ?? 5} />
            </div>
          </div>
        </div>

        {/* Member since */}
        <p className="text-center text-xs text-gray-400 mt-4">
          Member since {new Date(user?.created_at ?? Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </AppLayout>
  );
}
