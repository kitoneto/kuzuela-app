import type { TutorMessage as TutorMessageType } from '../../types';

interface TutorMessageProps {
  message: TutorMessageType;
  avatarEmoji?: string;
}

export function TutorMessageBubble({ message, avatarEmoji = '🤖' }: TutorMessageProps) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-lg flex-shrink-0">
          {avatarEmoji}
        </div>
      )}
      <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
            ${isUser
              ? 'bg-primary-500 text-white rounded-tr-sm'
              : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-sm'
            }`}
        >
          {message.content}
        </div>
        <span className="text-xs text-gray-400 mt-1">
          {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
