export interface User {
  id: string;
  email: string;
  name: string;
}

export interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswer: string;
}

export interface CourseModuleBase {
  id: string;
  title: string;
}

export interface TextModule extends CourseModuleBase {
  type: 'text';
  content: string;
}

export interface VideoModule extends CourseModuleBase {
  type: 'video';
  youtubeId: string;
}

export interface QuizModule extends CourseModuleBase {
  type: 'quiz';
  questions: QuizQuestion[];
}

export interface CodeModule extends CourseModuleBase {
  type: 'code';
  embedUrl: string;
}

export type CourseModule = TextModule | VideoModule | QuizModule | CodeModule;

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  modules: CourseModule[];
}

export type UserProgress = {
  [courseId: string]: string[]; // Array of completed module IDs
};
