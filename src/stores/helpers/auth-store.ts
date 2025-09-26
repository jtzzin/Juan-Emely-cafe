import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: () => void; // A função apenas muda o estado para true
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: () => set({ isAuthenticated: true }), // ✅ Mantém apenas a mudança de estado
  logout: () => set({ isAuthenticated: false }),
}));