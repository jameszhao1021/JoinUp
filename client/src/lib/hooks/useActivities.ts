import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { Activity } from "../types";
import { useUsers } from "./useUsers";

export const useActivities = (id?:string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const {users} = useUsers();

const {data: activities, isPending} = useQuery({
  queryKey: ['activities'],
  queryFn: async ()=>{
    const response = await agent.get<Activity[]>('/activities');
    return response.data;
  },
  enabled: !id && location.pathname ==='/activities' && !! users,
  select: data=>{
    return data.map(activity=>{
      return {
        ...activity,
        isHost: users?.id === activity.hostId,
        isGoing: activity.attendees.some(x=>x.id === users?.id)
      }
    })
  }
})


const {data:activity,isLoading: isLoadingActivity} = useQuery({
  queryKey: ['activities', id],
  queryFn: async ()=>{
     const response = await agent.get<Activity>(`/activities/${id}`);
    return response.data;
  },
  enabled: !!id && !! users,
  select: data=>{
    return {
      ...data,
      isHost: users?.id === data.hostId,
      isGoing: data.attendees.some(x=>x.id === users?.id)

    }
  }
})

// const updateActivity = useMutation({
//   mutationFn: async (activity: Activity) => {
//     await agent.put('/activities', activity)
//   },
//   onSuccess: async ()=>{
//     await queryClient.invalidateQueries({
//       queryKey: ['activities']
//     })
//   }
// })

    const updateActivity = useMutation({
        mutationFn: async (activity: Activity) => {
            await agent.put(`/activities/${activity.id}`, activity);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['activities', activity?.id]
            })
        }
    });


const createActivity = useMutation({
  mutationFn: async (activity: Activity) =>{
    const response =  await agent.post('/activities', activity);
    return response.data;
  },
  onSuccess: async()=>{
    await queryClient.invalidateQueries({
      queryKey:['activities']
    })
  }
})

const deleteActivity = useMutation({
  mutationFn: async(id: string) =>{
    await agent.delete(`/activities/${id}`)
  },
  onSuccess: async()=>{
    await queryClient.invalidateQueries({
      queryKey:['activities']
    })
  }
})

const updateAttendance = useMutation({
  mutationFn:async(id:string)=>{
     await agent.post(`/activities/${id}/attend`)
  },
  // onSuccess: async()=>{
  //   await queryClient.invalidateQueries({
  //     queryKey:['activities', id]
  //   })
  // }
  onMutate: async(activityId: string) =>{
    await queryClient.cancelQueries({queryKey: ['activities', activityId]});
    const prevActivity = queryClient.getQueryData<Activity>(['activities', activityId]);
    queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
      if(!oldActivity || !users){
        return oldActivity
      }
      const isHost = oldActivity.hostId === users.id;
      const isAttending = oldActivity.attendees.some(x=>x.id === users.id);

      return {
        ...oldActivity,
        isCancelled: isHost?!oldActivity.isCancelled:oldActivity.isCancelled,
        attendees:isAttending?isHost?oldActivity.attendees:oldActivity.attendees.filter(x=>x.id !== users.id)
        :[...oldActivity.attendees,{
          id:users.id,
          displayName:users.displayName,
          imageUrl: users.imageUrl
        }]
      }
    })

    return {prevActivity}
  },
  onError: (error, activityId, context)=>{
    console.log(error)
    if(context?.prevActivity){
      queryClient.setQueryData(['activities', activityId], context.prevActivity)
    }
  }
})

 return {
    activities, isPending, updateActivity, createActivity, deleteActivity, activity,isLoadingActivity, updateAttendance
 }
}