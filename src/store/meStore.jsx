import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';

export const useMeStore = create((set) => ({
  success: false,
  id: null,
  name: null,
  role: null, 
  notes: null,
  userPermissions: null,
  loading: false,
  error: null,

  getMe: async () => {
    set({ loading: true, error: null });
    const token = Cookies.get('token');
    if (!token) {
      set({ error: 'Token not found', loading: false });
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/Me`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      set({
        success: response.data.success, 
        id: response.data.data?.id,
        role: response.data.data?.role,
        name: response.data.data?.name,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response ? error.response.data.message : error.message,
        loading: false,
      });
    }
  },


}));
