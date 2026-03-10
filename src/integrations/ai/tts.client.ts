export async function textToSpeech(text: string, _lang = 'en-US'): Promise<void> {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = _lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}

export function stopSpeech(): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export const ttsClient = { speak: textToSpeech, stop: stopSpeech };
