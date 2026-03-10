import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../../../shared/components/navigation/BottomNav';
import { Bell, Moon, Globe, Shield, ChevronRight } from 'lucide-react';

export function SettingsPage() {
  const navigate = useNavigate();

  const settings = [
    { icon: <Bell className="h-5 w-5 text-purple-500" />, label: 'Notifications', desc: 'Daily reminders' },
    { icon: <Moon className="h-5 w-5 text-indigo-500" />, label: 'Dark mode', desc: 'Coming soon' },
    { icon: <Globe className="h-5 w-5 text-blue-500" />, label: 'Language', desc: 'Portuguese' },
    { icon: <Shield className="h-5 w-5 text-green-500" />, label: 'Privacy', desc: 'Manage your data' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="text-purple-600 text-sm mb-2">← Back</button>
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
      </div>
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          {settings.map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 last:border-0">
              {s.icon}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{s.label}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
