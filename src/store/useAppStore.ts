
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MeditationSession {
  id: string;
  title: string;
  category: string;
  duration: number;
  completedAt: Date;
  type: 'audio' | 'video' | 'timer';
}

interface UserProgress {
  totalMinutes: number;
  totalSessions: number;
  currentStreak: number;
  longestStreak: number;
  lastSessionDate: string;
  favoriteCategory: string;
  completedSessions: MeditationSession[];
  goals: {
    dailyMinutes: number;
    weeklyMinutes: number;
    monthlySessions: number;
  };
  achievements: string[];
}

interface AppStore {
  // User Progress
  userProgress: UserProgress;
  
  // Current Playing
  currentTrack: {
    id: string;
    title: string;
    type: 'audio' | 'video' | 'podcast' | 'radio';
    isPlaying: boolean;
  } | null;
  
  // Selected Category
  selectedCategory: string | null;
  
  // Actions
  addSession: (session: Omit<MeditationSession, 'id' | 'completedAt'>) => void;
  updateProgress: (minutes: number) => void;
  setCurrentTrack: (track: AppStore['currentTrack']) => void;
  setSelectedCategory: (category: string | null) => void;
  togglePlayPause: () => void;
  addAchievement: (achievement: string) => void;
  updateGoals: (goals: Partial<UserProgress['goals']>) => void;
}

const initialProgress: UserProgress = {
  totalMinutes: 0,
  totalSessions: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: '',
  favoriteCategory: '',
  completedSessions: [],
  goals: {
    dailyMinutes: 20,
    weeklyMinutes: 150,
    monthlySessions: 20,
  },
  achievements: [],
};

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      userProgress: initialProgress,
      currentTrack: null,
      selectedCategory: null,

      addSession: (session) => {
        const id = Date.now().toString();
        const completedAt = new Date();
        const newSession: MeditationSession = { ...session, id, completedAt };
        
        set((state) => {
          const updatedSessions = [...state.userProgress.completedSessions, newSession];
          const totalMinutes = state.userProgress.totalMinutes + session.duration;
          const totalSessions = state.userProgress.totalSessions + 1;
          
          // Update streak
          const today = new Date().toDateString();
          const lastSession = state.userProgress.lastSessionDate;
          const yesterday = new Date(Date.now() - 86400000).toDateString();
          
          let currentStreak = state.userProgress.currentStreak;
          if (!lastSession || lastSession === yesterday) {
            currentStreak += 1;
          } else if (lastSession !== today) {
            currentStreak = 1;
          }
          
          const longestStreak = Math.max(state.userProgress.longestStreak, currentStreak);
          
          // Update favorite category
          const categoryCount: Record<string, number> = {};
          updatedSessions.forEach(s => {
            categoryCount[s.category] = (categoryCount[s.category] || 0) + 1;
          });
          const favoriteCategory = Object.keys(categoryCount).reduce((a, b) => 
            categoryCount[a] > categoryCount[b] ? a : b, session.category
          );

          return {
            ...state,
            userProgress: {
              ...state.userProgress,
              totalMinutes,
              totalSessions,
              currentStreak,
              longestStreak,
              lastSessionDate: today,
              favoriteCategory,
              completedSessions: updatedSessions,
            },
          };
        });
      },

      updateProgress: (minutes) => {
        set((state) => ({
          ...state,
          userProgress: {
            ...state.userProgress,
            totalMinutes: state.userProgress.totalMinutes + minutes,
          },
        }));
      },

      setCurrentTrack: (track) => {
        set({ currentTrack: track });
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      togglePlayPause: () => {
        set((state) => ({
          ...state,
          currentTrack: state.currentTrack ? {
            ...state.currentTrack,
            isPlaying: !state.currentTrack.isPlaying,
          } : null,
        }));
      },

      addAchievement: (achievement) => {
        set((state) => ({
          ...state,
          userProgress: {
            ...state.userProgress,
            achievements: [...state.userProgress.achievements, achievement],
          },
        }));
      },

      updateGoals: (goals) => {
        set((state) => ({
          ...state,
          userProgress: {
            ...state.userProgress,
            goals: { ...state.userProgress.goals, ...goals },
          },
        }));
      },
    }),
    {
      name: 'mindful-space-storage',
    }
  )
);
