import { create } from "zustand";
import api from "@/lib/axios";

export interface Manager {
  id: string;
  userId: string;
  salonId?: string;
  avatar?: string;
  user: { id: string; name: string; email: string; phone: string; address?: string; role?: string };
  salon?: { id: string; name: string };
}

interface ManagerState {
  managers: Manager[];
  isLoading: boolean;
  error: string | null;
  fetchManagers: () => Promise<void>;
  createManager: (data: { name: string; email: string; password: string; phone: string }) => Promise<void>;
  updateManager: (managerId: string, data: { phone: string; address: string }) => Promise<void>;
  assignManager: (managerId: string, salonId: string) => Promise<void>;
  deleteManager: (managerId: string) => Promise<void>;
}

export const useManagerStore = create<ManagerState>((set) => ({
  managers: [],
  isLoading: false,
  error: null,

  fetchManagers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/api/managers");
      set({ managers: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || "Failed to fetch managers", isLoading: false });
    }
  },

  createManager: async (data) => {
    const res = await api.post("/api/managers", data);
    set((s) => ({ managers: [res.data.data, ...s.managers] }));
  },

  updateManager: async (managerId, data) => {
    const res = await api.put(`/api/managers/${managerId}`, data);
    set((s) => ({
      managers: s.managers.map((m) =>
        m.id === managerId ? { ...m, ...res.data.data } : m,
      ),
    }));
  },

  assignManager: async (managerId, salonId) => {
    await api.put(`/api/managers/${managerId}/assign`, { salonId });
  },

  deleteManager: async (managerId) => {
    await api.delete(`/api/managers/${managerId}`);
    set((s) => ({ managers: s.managers.filter((m) => m.id !== managerId) }));
  },
}));
