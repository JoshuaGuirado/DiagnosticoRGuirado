import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DiagnosticResult {
  id: string;
  type: 'empresarial' | 'franqueabilidade';
  clientName: string;
  phone: string;
  city: string;
  niche: string;
  date: string;
  score: number; // 0 to 100
  categoryScores: Record<string, number>; // Raw category scores
  categoryMaxScores: Record<string, number>;
  answers: Record<string, number>;
}

interface AppState {
  results: DiagnosticResult[];
  addResult: (result: DiagnosticResult) => void;
  deleteResult: (id: string) => void;
  isAdminAuthenticated: boolean;
  setAdminAuthenticated: (status: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      results: [],
      addResult: (result) => set((state) => ({ results: [...state.results, result] })),
      deleteResult: (id) => set((state) => ({ results: state.results.filter((r) => r.id !== id) })),
      isAdminAuthenticated: false,
      setAdminAuthenticated: (status) => set({ isAdminAuthenticated: status }),
    }),
    {
      name: 'rg-diagnostics-storage',
    }
  )
);
