import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useTask = create((set) => ({
  loading: false,
  error: null,
  tasks: [],
  task : null,


  getTasks: async () => {
    set({ loading: true, error: null });
   const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token not found', loading: false });
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Task`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false, tasks: response.data?.data || [] });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  postTask: async (postDate) => {
    set({ loading: true, error: null });
   const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token not found', loading: false });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Task`,
        postDate,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newTask = response.data.data;
      set((state)=>({
        tasks: [...state.tasks, newTask] ,
        loading: false,
      }))
    } catch (error) {
      
      set({ loading: false, 
        error: error.response ? error.response.data.message : error.message,
       });
       throw error;

    }
  },
  deleteTask : async(id)=>{
    set({ loading: true, error: null });
       const token = Cookies.get('token');
        if (!token) {
          set({ error: 'Token not found', loading: false });
          return;
        }
    try {

      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Task/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  },
  getTaskById : async (id) => {
    set({ loading: true, error: null });
     const token = Cookies.get('token');
      if (!token) {
        set({ error: 'Token not found', loading: false });
        return;
      }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Task/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data && response.data.data) {
        set({ task: response.data.data, loading: false });
        return response.data.data; 
      } else {
        set({ error: "Client data not found", loading: false });
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

   updateTask: async (id, updateData) => {
    set({ loading: true, error: null });
     const token = Cookies.get('token');
      if (!token) {
        set({ error: 'Token not found', loading: false });
        return;
      }

    try {

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Task/${id}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTask = response.data.data;

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? updatedTask : task
        ),
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
