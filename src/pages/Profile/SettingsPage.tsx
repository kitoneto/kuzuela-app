import { useState } from 'react';
import { AppLayout } from '../../components/layout/AppLayout';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/common/Toast';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Bell, Globe, Moon, LogOut, Trash2, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SettingsPage() {
  const { signOut } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSave = () => {
    success('Settings saved!');
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center">
            <Settings size={22} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 mb-4">
          {/* Notifications */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-500">Daily reminders to keep your streak</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full transition-colors ${notifications ? 'bg-primary-500' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-0.5 ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Dark mode */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <Moon size={20} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Dark Mode</p>
                <p className="text-sm text-gray-500">Coming soon</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              disabled
              className={`w-12 h-6 rounded-full transition-colors opacity-50 ${darkMode ? 'bg-primary-500' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform mx-0.5 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>

          {/* Interface language */}
          <div className="flex items-center justify-between p-5">
            <div className="flex items-center gap-3">
              <Globe size={20} className="text-gray-500" />
              <div>
                <p className="font-medium text-gray-900">Interface Language</p>
                <p className="text-sm text-gray-500">Language for menus and UI</p>
              </div>
            </div>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-primary-400"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>

        <Button onClick={handleSave} className="w-full mb-8">Save Settings</Button>

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Account Actions</p>
          </div>
          <div className="divide-y divide-gray-50">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-5 py-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={18} className="text-gray-400" />
              Sign Out
            </button>
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="w-full flex items-center gap-3 px-5 py-4 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>

        <Modal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete Account"
        >
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete your account? This action cannot be undone and all your progress will be lost.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" className="flex-1" onClick={() => setDeleteModalOpen(false)}>
              Delete Account
            </Button>
          </div>
        </Modal>
      </div>
    </AppLayout>
  );
}
