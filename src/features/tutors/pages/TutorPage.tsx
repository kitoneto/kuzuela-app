import { useState } from 'react'
import { useTutorLanguageContext } from '../hooks/useTutorLanguageContext'
import { buildTutorSystemPrompt } from '../services/tutorPrompts.service'
import { getLanguageInfo } from '@/lib/constants/languages.constants'

interface Message {
  id: string
  role: 'user' | 'tutor'
  content: string
  timestamp: Date
}

export function TutorPage() {
  const langContext = useTutorLanguageContext()
  const { greeting } = buildTutorSystemPrompt(langContext)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'tutor',
      content: greeting,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // TODO: Replace with actual AI provider integration (e.g., OpenAI, Anthropic)
    // The systemPrompt should be passed as the system message to the AI API
    setTimeout(() => {
      const tutorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'tutor',
        content: `I understand your message. Let me help you practice ${getLanguageInfo(langContext.learningLanguage).name}! [Connect an AI provider using the system prompt to enable real responses.]`,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, tutorMsg])
      setIsLoading(false)
    }, 1000)
  }

  const learningLangInfo = getLanguageInfo(langContext.learningLanguage)
  const explanationLangInfo = getLanguageInfo(langContext.explanationLanguage)

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-80px)]">
      {/* Tutor Header */}
      <div className="flex items-center gap-4 mb-4 p-4 bg-white rounded-2xl border border-gray-200">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl flex items-center justify-center text-white text-2xl">
          🤖
        </div>
        <div>
          <h1 className="font-bold text-gray-900">Kuzuela AI Tutor</h1>
          <p className="text-sm text-gray-500">
            Teaching {learningLangInfo.name} •
            Explaining in {explanationLangInfo.name}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-xs text-gray-400">Proficiency</p>
          <p className="text-sm font-medium text-gray-700 capitalize">{langContext.proficiencyLevel}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === 'user'
                  ? 'bg-primary-500 text-white rounded-br-sm'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={`Ask your tutor in ${getLanguageInfo(langContext.learningLanguage).name}...`}
          className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          className="px-6 py-3 bg-primary-500 text-white rounded-2xl font-medium hover:bg-primary-600 transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}
