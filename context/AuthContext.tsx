import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserProgress } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, name: string) => void;
  signOut: () => void;
  progress: UserProgress;
  updateModuleProgress: (courseId: string, moduleId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress>({});

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('sh-ai-academy-user');
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);

        const allProgress = JSON.parse(localStorage.getItem('sh-ai-academy-progress') || '{}');
        setProgress(allProgress[parsedUser.id] || {});
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      localStorage.removeItem('sh-ai-academy-user');
      localStorage.removeItem('sh-ai-academy-progress');
    }
  }, []);

  const signIn = (email: string, name: string) => {
    const newUser: User = { id: Date.now().toString(), email, name };
    localStorage.setItem('sh-ai-academy-user', JSON.stringify(newUser));
    setUser(newUser);

    const allProgress = JSON.parse(localStorage.getItem('sh-ai-academy-progress') || '{}');
    setProgress(allProgress[newUser.id] || {});
  };

  const signOut = () => {
    localStorage.removeItem('sh-ai-academy-user');
    setUser(null);
    setProgress({});
  };

  const updateModuleProgress = (courseId: string, moduleId: string) => {
    if (!user) return;

    setProgress(prevProgress => {
      const courseModules = prevProgress[courseId] || [];
      if (courseModules.includes(moduleId)) {
        return prevProgress; // Already complete
      }

      const newCourseProgress = [...courseModules, moduleId];
      const newProgress = {
        ...prevProgress,
        [courseId]: newCourseProgress,
      };

      const allProgress = JSON.parse(localStorage.getItem('sh-ai-academy-progress') || '{}');
      allProgress[user.id] = newProgress;
      localStorage.setItem('sh-ai-academy-progress', JSON.stringify(allProgress));

      return newProgress;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, progress, updateModuleProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
