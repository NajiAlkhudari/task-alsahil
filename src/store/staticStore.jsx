

import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useStatics = create((set) => ({
  loading: false,
  error: null,
  statics: [],
  employeeStats: null,

  getStatics: async (startDate = "", endDate = "") => {
    set({ loading: true, error: null });

    const token = Cookies.get("token");
    if (!token) {
      set({ error: "Token not found", loading: false });
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit/GetVisit?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data?.data;

      console.log(" API Response Data:", data);

      set({
        loading: false,
        statics: data || [],
      });
    } catch (error) {
      console.error(" API Error:", error);
      set({ loading: false, error: error.message });
    }
  },

  getEmployeeStats: async (employeeId) => {
    set({ loading: true, error: null });

    const token = Cookies.get("token");
    if (!token) {
      set({ error: "Token not found", loading: false });
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit/employee-stats/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data?.data;

      console.log("📊 Employee Stats Response:", data);

      set({
        loading: false,
        employeeStats: data || null,
      });
    } catch (error) {
      console.error(" Employee Stats API Error:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

