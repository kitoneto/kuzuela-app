export interface LLMMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface LLMResponse {
  message: string;
  tokensUsed?: number;
}

const MOCK_RESPONSES = [
  "That's a great question! Let me help you with that.",
  "Excellent effort! Here's how you can improve...",
  "Very good! You're making great progress.",
  "Let me explain that in a simpler way.",
  "That's correct! Keep up the great work!",
];

export async function sendMessage(
  _messages: LLMMessage[],
  _systemPrompt?: string
): Promise<LLMResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

  const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  return {
    message: randomResponse,
    tokensUsed: Math.floor(Math.random() * 200) + 50,
  };
}

export const llmClient = { sendMessage };
