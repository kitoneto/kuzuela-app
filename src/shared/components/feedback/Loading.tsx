interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Loading({ fullScreen, size = 'md' }: LoadingProps) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
  const spinner = (
    <div className={`animate-spin rounded-full border-2 border-purple-200 border-t-purple-600 ${sizes[size]}`} />
  );
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {spinner}
      </div>
    );
  }
  return <div className="flex justify-center p-4">{spinner}</div>;
}
