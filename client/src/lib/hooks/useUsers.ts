import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { LoginUser, User } from "../types";
import { toast } from "react-toastify";


export const useUsers = () =>{
  const queryClient = useQueryClient();

const  {data:users, isLoading:loadingUserInfo} = useQuery({
    queryKey:['users'],
    queryFn: async()=>{
        const response = await agent.get('/account/user-info');
        return response.data;
    },
    enabled: !queryClient.getQueryData(['users'])
})

  const registerUser = useMutation({
    mutationFn: async(user: User) =>{
        const response = await agent.post('/account/register', user);
        return response.data
    },
    onSuccess: async()=>{
       toast.success('Register successful - you can now login')
    }
  })

const loginUser = useMutation({
    mutationFn: async(user:LoginUser)=>{
        const response = await agent.post('/login?useCookies=true', user);
        return response.data;
    },
       onSuccess: async()=>{
        await queryClient.invalidateQueries({
            queryKey: ['users']
        });

    }
})

const logoutUser = useMutation({
    mutationFn: async()=>{
        const response = await agent.post('/account/logout');
        return response.data;
    },
     onSuccess: async()=>{
         queryClient.removeQueries({
            queryKey: ['users']
        });
           queryClient.removeQueries({
            queryKey: ['activities']
        })
    }
})

  
  return {users,registerUser, logoutUser, loginUser, loadingUserInfo}




}