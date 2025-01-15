import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      //url get from axios file
      const res = axiosInstance.get('auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.log('error in check auth', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signUp:async () =>{
    
  }
}))
