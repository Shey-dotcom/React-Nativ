import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  login: (user) => set((state) => ({ ...state, user })),
  logout: () => set((state) => ({ ...state, user: null })),
}));
