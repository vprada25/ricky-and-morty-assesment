import { create } from "zustand";

interface UIState {
  isFilterModalOpen: boolean;
  toggleFilterModal: () => void;

  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;

  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isFilterModalOpen: false,
  error: null,
  isLoading: false,

  toggleFilterModal: () => set({ isFilterModalOpen: !get().isFilterModalOpen }),

  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),

  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
