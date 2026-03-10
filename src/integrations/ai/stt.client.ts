export interface STTResult {
  transcript: string;
  confidence: number;
}

export function startListening(onResult: (result: STTResult) => void, onError?: (error: string) => void): (() => void) | null {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    onError?.('Speech recognition not supported in this browser');
    return null;
  }

  const SpeechRecognition =
    (window as unknown as { SpeechRecognition?: typeof window.SpeechRecognition; webkitSpeechRecognition?: typeof window.SpeechRecognition }).SpeechRecognition ??
    (window as unknown as { webkitSpeechRecognition?: typeof window.SpeechRecognition }).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    onError?.('Speech recognition not available');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[0][0];
    onResult({ transcript: result.transcript, confidence: result.confidence });
  };

  recognition.onerror = () => {
    onError?.('Speech recognition error');
  };

  recognition.start();
  return () => recognition.stop();
}

export const sttClient = { startListening };
