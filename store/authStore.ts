import { create } from "zustand";

export const useAuth = create((set) => ({
  user: null,
  token: null,

  setUser: (user: any) => set({ user }),
  setToken: (token: any) => set({ token }),
}));
