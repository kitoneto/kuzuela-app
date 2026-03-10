import { type ReactNode } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface LessonTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function LessonTabs({ tabs, activeTab, onTabChange }: LessonTabsProps) {
  return (
    <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200
            ${activeTab === tab.id
              ? 'bg-white text-primary-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-800'
            }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
