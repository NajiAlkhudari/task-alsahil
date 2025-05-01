import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useReport = create((set) => ({
  loading: false,
  error: null,
  userVisits: [],

  getReport: async () => {
    set({ loading: true, error: null });
    const token = Cookies.get("token");
    if (!token) {
      set({ error: "Token not found", loading: false });
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Report/clientvisits`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false, userVisits: response.data?.data || [] });

    } catch (error) {
      set({ error: error.message });
    }
  },
}));
