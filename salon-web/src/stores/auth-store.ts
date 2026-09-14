import { create } from "zustand";
import api from "@/lib/axios";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  salonId?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  login: (email: string, password: string) => Promise<User>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<User>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export function getDefaultRoute(role: string): string {
  switch (role?.toLowerCase()) {
    case "owner":
      return "/admin/dashboard";
    case "staff":
      return "/schedule";
    case "manager":
      return "/dashboard";
    case "customer":
    default:
      return "/salons";
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    const response = await api.post("/api/auth/login", { email, password });
    const data = response.data;

    if (!data.success) {
      throw new Error(data.error || "Login failed");
    }

    set({ user: data.data.user, isAuthenticated: true });
    return data.data.user;
  },

  register: async (formData) => {
    const response = await api.post("/api/auth/register", {
      ...formData,
      role: "customer",
    });
    const data = response.data;

    if (!data.success) {
      throw new Error(data.error || "Registration failed");
    }

    set({ user: data.data.user, isAuthenticated: true });
    return data.data.user;
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/api/auth/me");
      const data = response.data;

      if (data.success && data.data.user) {
        set({ user: data.data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
}));
