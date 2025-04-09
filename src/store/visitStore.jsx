import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
export const useVisit = create((set) => ({
  loading: false,
  error: null,
  visits: [],

  getVisits: async () => {
    set({ loading: true, error: null });
  const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token not found', loading: false });
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false, visits: response.data?.data || [] });
    } catch (error) {
      set({ error: error.message });
    }
  },
}));
