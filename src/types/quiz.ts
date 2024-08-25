export interface QuizQuestion {
  content: string;
  explanation?: string;
  options: {
    content: string;
    isCorrect: boolean;
  }[];
}

export interface QuizInput {
  title: string;
  description?: string;
  isPublic: boolean;
  questions?: QuizQuestion[];
}
