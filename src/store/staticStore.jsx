import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useStatics = create((set) => ({
  loading: false,
  error: null,
  statics: [],

  getStatics: async (firstdate = "", lastdate = "") => {
    set({ loading: true, error: null });

    const token = Cookies.get("token");
    if (!token) {
      set({ error: "Token not found", loading: false });
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit/GetVisit?firstdate=${firstdate}&lastdate=${lastdate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data?.data;

      console.log("✅ API Response Data:", data); 

      set({
        loading: false,
        statics: data || [],
      });

    } catch (error) {
      console.error("❌ API Error:", error); 
      set({ loading: false, error: error.message });
    }
  },
}));
