import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers:[],

  checkAuth: async () => {
    try {
      //url get from axios file
      const res =await axiosInstance.get('auth/check')
      set({ authUser: res.data })
    } catch (error) {
      console.log('error in check auth', error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post('auth/signup', data)
      set({ authUser: res.data })
      toast.success('Account Created Successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('auth/logout')
      set({ authUser: null })
      toast.success('User Logged Out SuccessFully')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  },
  login: async (data) => {
    set({ isLoggingIng: true })
    try {
      const res = await axiosInstance.post('auth/login', data)
      set({ authUser: res.data })
      toast.success('Logged In Successfully')
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIng: false })
    }
  },
  updateProfile:async (data)=>{
    set({isUpdatingProfile:true})
    try {
      const res= await axiosInstance.put("/auth/update-profile",data)
      set({authUser:res.data})
      toast.success("profile updated successfully")
    } catch (error) {
      console.log("error in updating profile",error)
      toast.error(error.response.data.message)
    }finally{
      set({ isUpdatingProfile: false })
    }
  },
}))
