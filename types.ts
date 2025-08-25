
export interface VocabularyWord {
  id: number;
  spelling: string;
  koreanMeaning: string;
  exampleSentence: string;
  koreanTranslation: string;
}

export type QuestionType = 'E_TO_K_MCQ' | 'K_TO_E_MCQ' | 'K_TO_E_INPUT';

export interface Question {
  word: VocabularyWord;
  type: QuestionType;
}
