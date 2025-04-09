import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useStore = create((set) => ({
  loading: false,
  error: null,
  users: [],
  user: null,

  getUser: async () => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({
        users: response.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },

  postUser: async (postData) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const newUser = response.data.data;

      set((state) => ({
        users: [...state.users, newUser],
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

  getUserById: async (id) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.data) {
        set({ user: response.data.data, loading: false });
        return response.data.data;
      } else {
        set({ error: "User data not found", loading: false });
        return null;
      }
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
      return null;
    }
  },

  updateUser: async (id, updateData) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = response.data.data;

      set((state) => ({
        users: state.users.map((user) => (user.id === id ? updatedUser : user)),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  },

  deleteUser: async (id) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/User/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  },
}));
