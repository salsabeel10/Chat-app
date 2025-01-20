import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const BASE_URL = 'http://localhost:5001/'

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      //checking each refresh app
      const res = await axiosInstance.get('auth/check')
      set({ authUser: res.data })
      get.connectSocket()
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
      get.connectSocket()
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
      const disconnectSocket = get().disconnectSocket
      disconnectSocket() // Ensure it's called properly
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
      get().connectSocket()
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isLoggingIng: false })
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true })
    try {
      const res = await axiosInstance.put('/auth/update-profile', data)
      set({ authUser: res.data })
      toast.success('profile updated successfully')
    } catch (error) {
      console.log('error in updating profile', error)
      toast.error(error.response.data.message)
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return
    const socket = io(BASE_URL) // Initialize socket
    socket.connect()
    set({ socket }) // Store socket in the state
  },
  disconnectSocket: () => {
     const socket = get().socket // Access the socket from the state
     if (socket?.connected) {
       socket.disconnect() // Disconnect if connected
       set({ socket: null }) // Clear the socket from the state
       console.log('Socket disconnected successfully')
     } else {
       console.log('No active socket connection to disconnect')
     }
  },
}))
