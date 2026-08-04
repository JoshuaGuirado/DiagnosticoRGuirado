import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DiagnosticResult {
  id: string;
  type: 'empresarial' | 'franqueabilidade';
  clientName: string;
  companyName?: string;
  email?: string;
  phone: string;
  city: string;
  segment?: string;
  operationTime?: string;
  ownUnits?: number;
  revenue?: string;
  date: string;
  score: number; // 0 to 100
  categoryScores: Record<string, number>; // Raw category scores
  categoryMaxScores: Record<string, number>;
  answers: Record<string, number>;
  feedbackRating?: number;
}

interface AppState {
  results: DiagnosticResult[];
  addResult: (result: DiagnosticResult) => void;
  deleteResult: (id: string) => void;
  updateResultRating: (id: string, rating: number) => void;
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (status: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      results: [],
      addResult: (result) => set((state) => ({ results: [...state.results, result] })),
      deleteResult: (id) => set((state) => ({ results: state.results.filter((r) => r.id !== id) })),
      updateResultRating: (id, rating) => set((state) => ({
        results: state.results.map((r) => r.id === id ? { ...r, feedbackRating: rating } : r)
      })),
      isAdminAuthenticated: false,
      setAdminAuthenticated: (status) => set({ isAdminAuthenticated: status }),
    }),
    {
      name: 'rg-diagnostics-storage',
    }
  )
);
