import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'


export const useChatStore=create((set)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessageLoading:false,

    getUsers:async () =>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/message/users");
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages:async(userId)=>{
        set({isMessageLoading:true})
        try {
            const res = await axiosInstance.get(`message/${userId}`)
            set({message:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({ isMessageLoading: false })
        }
    },
    //need optimization
    setSelectedUser:(selectedUser)=>set({selectedUser},)
}))