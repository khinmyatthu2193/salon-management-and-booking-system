import { create } from "zustand";
import api from "@/lib/axios";

export interface Staff {
  id: string;
  userId: string;
  salonId?: string;
  specialty?: string;
  user: { id: string; name: string; email: string; phone?: string };
  salon?: { id: string; name: string };
  createdAt: string;
}

interface StaffState {
  staff: Staff[];
  isLoading: boolean;
  error: string | null;
  fetchAllStaff: () => Promise<void>;
  fetchSalonStaff: (salonId: string) => Promise<void>;
  addStaff: (data: { name: string; email: string; password: string; phone?: string; specialty?: string }) => Promise<void>;
  assignStaff: (staffId: string, salonId: string) => Promise<void>;
  updateStaff: (id: string, data: { name?: string; phone?: string; specialty?: string }) => Promise<void>;
  removeStaff: (id: string) => Promise<void>;
}

export const useStaffStore = create<StaffState>((set) => ({
  staff: [],
  isLoading: false,
  error: null,

  fetchAllStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get("/api/staff");
      set({ staff: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || "Failed to fetch staff", isLoading: false });
    }
  },

  fetchSalonStaff: async (salonId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.get(`/api/salons/${salonId}/staff`);
      set({ staff: res.data.data, isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.error || "Failed to fetch staff", isLoading: false });
    }
  },

  addStaff: async (data) => {
    const res = await api.post("/api/staff", data);
    set((s) => ({ staff: [res.data.data, ...s.staff] }));
  },

  assignStaff: async (staffId, salonId) => {
    await api.put(`/api/staff/${staffId}/assign`, { salonId });
  },

  updateStaff: async (id, data) => {
    const res = await api.put(`/api/staff/${id}`, data);
    set((s) => ({
      staff: s.staff.map((st) => (st.id === id ? { ...st, ...res.data.data } : st)),
    }));
  },

  removeStaff: async (id) => {
    await api.delete(`/api/staff/${id}`);
    set((s) => ({ staff: s.staff.filter((st) => st.id !== id) }));
  },
}));
