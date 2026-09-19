export interface StudentUser {
  id: string;
  name: string;
  email: string;
  grade: string; // e.g., "6to Grado de Primaria"
  avatar: string; // avatar identifier
  totalPoints: number;
  matchesPlayed: number;
  matchesWon: number;
  courseCompleted: boolean;
  completedLessons: string[]; // lesson ids
  examScore?: number; // e.g. 95%
  certificateId?: string;
  certificateDate?: string;
}

export type GameMode = 'vs-ai' | 'two-players';
export type AIDifficulty = 'facil' | 'normal' | 'campeon';

export interface VolleyballQuestion {
  id: string;
  category: 'Historia y Cancha' | 'Fundamentos Técnicos' | 'Reglas Oficiales' | 'Posiciones y Tácticas' | 'Juego Limpio y Arbitraje';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  didYouKnow?: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  content: string[];
  keyRules: string[];
  interactiveTip: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  iconName: string;
  description: string;
  lessons: CourseLesson[];
}

export interface PowerUp {
  type: 'superJump' | 'lightningServe' | 'smashMaster' | 'doubleScore';
  name: string;
  description: string;
  duration: number; // in seconds
  icon: string;
}
