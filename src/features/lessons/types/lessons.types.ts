export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  unitNumber: number;
  lessonNumber: number;
  xpReward: number;
  vocabulary: VocabItem[];
  dialogue: DialogueLine[];
}

export interface VocabItem {
  id: string;
  word: string;
  translation: string;
  example: string;
  phonetic?: string;
}

export interface DialogueLine {
  id: string;
  speaker: string;
  text: string;
  translation: string;
}
