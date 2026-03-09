import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StepNavigatorProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  onComplete?: () => void;
  isLastStep?: boolean;
}

export function StepNavigator({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  onComplete,
  isLastStep,
}: StepNavigatorProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        onClick={onPrev}
        disabled={currentStep === 0}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {/* Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i === currentStep
                ? 'w-4 h-2 bg-primary-500'
                : i < currentStep
                ? 'w-2 h-2 bg-primary-300'
                : 'w-2 h-2 bg-gray-200'
            }`}
          />
        ))}
      </div>

      {isLastStep ? (
        <button
          onClick={onComplete}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
        >
          Complete! 🎉
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white text-sm font-semibold hover:bg-primary-600 transition-colors"
        >
          Next
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
