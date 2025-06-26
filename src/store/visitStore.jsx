import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useVisit = create((set) => ({
  loading: false,
  error: null,
  visits: [],
  currentPage: 1,
  totalPage: 1,
  pageSize: 10,
  totalCount: 0,
  amountReceived : 0,



  getVisits: async (
    page = 1,
    pageSize = 10,
    name = "",
    firstdate = "",
    lastdate = "",
    amountReceived = 0 ,

  ) => {
    set({ loading: true, error: null });
    const token = Cookies.get("token");
    if (!token) {
      set({ error: "Token not found", loading: false });
      return;
    }
  
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit?page=${page}&pageSize=${pageSize}&name=${name}&firstdate=${firstdate}&lastdate=${lastdate}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data?.data;

      console.log("Person API Response Data:", data);

      set({
        loading: false,
        visits: data?.data || [],
        currentPage: data?.currentPage || 1,
        totalPage: data?.totalPage || 1,
        pageSize: data?.pageSize || 10,
        totalCount: data?.totalCount || 0,
        amountReceived : data?.amountReceived || 0,
      });
    } catch (error) {
      set({ error: error.message });
    }
  },


    postVisit: async (postData) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Visit`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newVisit = response.data.data;

      set((state) => ({
        visits: [...state.visits, newVisit],
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
      throw error;
    }
  },
}));
