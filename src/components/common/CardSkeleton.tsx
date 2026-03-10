export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-6 animate-pulse ${className}`}>
      <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3" />
      <div className="h-3 bg-gray-100 rounded-full w-full mb-2" />
      <div className="h-3 bg-gray-100 rounded-full w-5/6 mb-4" />
      <div className="h-8 bg-gray-100 rounded-xl w-1/3" />
    </div>
  );
}

export function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-3 bg-gray-200 rounded-full ${i === lines - 1 ? 'w-4/5' : 'w-full'}`}
        />
      ))}
    </div>
  );
}
