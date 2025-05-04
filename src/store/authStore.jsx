
import { create } from 'zustand';
import { devtools } from 'zustand/middleware'; 
import axios from 'axios';
import Cookies from 'js-cookie';


export const useAuthStore = create (
  devtools(
  (set)=>({
    token : null,
    role: null,
    loading: false,
    error: null,
    success: false,
    

    login : async (userName , password)=>{
      set({ loading: true, error: null, success: false });
      try{
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`,
          {userName,password}
        );
        const data = response?.data;
        if (!data || !data.token) {
          throw new Error('Invalid response from server');
        }     
             const { token, role } = data;
             if (role !== 3) {
              throw new Error("غير مصرح لك بالدخولً.");
            }
             Cookies.set('token', token);
             set({ token, role, success: true, loading: false });
      }
      catch(error)
      {
        set({
          error:
            error.response?.data?.message ||
            error.message ||
            'Login failed',
          loading: false,
        });
      }
    },
  })
));