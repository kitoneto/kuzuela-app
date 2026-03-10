import { useNavigate } from 'react-router-dom';
import { CheckCircle, Lock, Star } from 'lucide-react';
import type { Unit } from '../types/courses.types';

interface UnitListProps {
  units: Unit[];
  courseId: string;
}

export function UnitList({ units, courseId }: UnitListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {units.map(unit => (
        <div key={unit.number}>
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {unit.number}
            </div>
            <h3 className="font-bold text-gray-800">{unit.title}</h3>
          </div>
          <div className="space-y-2 pl-11">
            {unit.lessons.map(lesson => (
              <button
                key={lesson.id}
                disabled={lesson.isLocked}
                onClick={() => navigate(`/courses/${courseId}/lessons/${lesson.id}`)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  lesson.isLocked
                    ? 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                    : lesson.isCompleted
                    ? 'bg-green-50 border-green-100 hover:bg-green-100'
                    : 'bg-white border-gray-200 hover:border-purple-200 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                    lesson.isCompleted ? 'bg-green-500' : lesson.isLocked ? 'bg-gray-300' : 'bg-purple-100'
                  }`}>
                    {lesson.isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-white" />
                    ) : lesson.isLocked ? (
                      <Lock className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Star className="h-4 w-4 text-purple-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800">{lesson.title}</p>
                    <p className="text-xs text-gray-500">{lesson.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-600 flex-shrink-0">
                    <Star className="h-3 w-3" />
                    {lesson.xpReward} XP
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
