import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

export const useClient = create((set) => ({
  loading: false,
  error: null,
  clients: [],
  client : null,

  getClients: async () => {
    set({ loading: true, error: null });
      const token = Cookies.get('token');
        if (!token) {
          set({ error: 'Token not found', loading: false });
          return;
        }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      set({
        clients: response.data?.data || [],
        loading: false,
      });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  postClient: async (postDate) => {
    set({ loading: true, error: null });
  const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token not found', loading: false });
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client`,
        postDate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },        }
      );
      const newClient = response.data.data;
      set((state)=>({
        clients: [...state.clients, newClient] ,
        loading: false,
      }))
    } catch (error) {
      
      set({ loading: false, 
        error: error.response ? error.response.data.message : error.message,
       });
       throw error;

    }
  },

  deleteClient : async(id)=>{
    set({ loading: true, error: null });
      const token = Cookies.get('token');
        if (!token) {
          set({ error: 'Token not found', loading: false });
          return;
        }
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      set((state) => ({
        clients: state.clients.filter((client) => client.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  },



   getClientById : async (id) => {
    set({ loading: true, error: null });
    const token = Cookies.get('token');
      if (!token) {
        set({ error: 'Token not found', loading: false });
        return;
      }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },      });
      
      if (response.data && response.data.data) {
        set({ client: response.data.data, loading: false });
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
  

  updateClient: async (id, updateData) => {
    set({ loading: true, error: null });
    const token = Cookies.get('token');
      if (!token) {
        set({ error: 'Token not found', loading: false });
        return;
      }

    try {

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Client/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedClient = response.data.data;

      set((state) => ({
        clients: state.clients.map((client) =>
          client.id === id ? updatedClient : client
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
