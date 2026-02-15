import  { Paper, Typography, Box, Button } from "@mui/material"
import { useEffect } from "react";
import { useActivities } from "../../../lib/hooks/useActivities";
import { useNavigate, useParams } from "react-router";
import { Resolver, useForm } from "react-hook-form";
import { activitySchema, ActivitySchema } from "../../../lib/schemas/activitySchema";
import {zodResolver} from '@hookform/resolvers/zod'
import TextInput from "../../../app/layout/shared/components/TextInput";
import SelectInput from "../../../app/layout/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import DateTimeInput from "../../../app/layout/shared/components/DateTimeInput";
import LocationInput from "../../../app/layout/shared/components/LocationInput";
import { Activity } from "../../../lib/types";

const ActivityForm = () => {


// const {register, control, reset, handleSubmit, formState:{errors}} = useForm<ActivitySchema>({
//   mode: 'onTouched', 
//   resolver: zodResolver(activitySchema)
// });


const { control, reset, handleSubmit } = useForm<ActivitySchema>({
  mode: "onTouched",
  resolver: zodResolver(activitySchema) as Resolver<ActivitySchema>,
});

 const navigate = useNavigate();
const {id} = useParams();
const {updateActivity, createActivity, activity, isLoadingActivity} = useActivities(id);

useEffect(()=>{
  if(activity) reset({
    ...activity,
    location:{
      city:activity.city,
      venue: activity.venue,
      latitude: activity.latitude,
      longitude: activity.longitude
    }
  })
},[activity, reset])
//  old approach

// const handleSubmit = async (event: FormEvent<HTMLFormElement> ) =>{
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const data:{[Key: string]: FormDataEntryValue} = {};
//     formData.forEach((value,key)=>{
//         data[key] = value
//     })

//     if(activity){
//       data.id = activity.id;
//       await updateActivity.mutateAsync(data as unknown as Activity);
//       navigate(`/activities/${id}`)
//     } else{
//        createActivity.mutate(data as unknown as Activity,{
//       onSuccess: (id)=>{
//       navigate(`/activities/${id}`)
//      }
//        });
      
//     }
// }


// new approach
const onSubmit =  async(data: ActivitySchema) =>{
  
 const {location, ...rest} = data;
 const flattenedData = {...rest,...location};
 try{
   if (activity){
    updateActivity.mutate({...activity, ...flattenedData}, {
      onSuccess:()=>navigate(`/activities/${activity.id}`)
    })
   } else {
      createActivity.mutate(flattenedData as Activity,{
      onSuccess: (id) => navigate(`/activities/${id}`)
    })
   }
 }catch(error){
  console.log(error)
 }
  
}

if(isLoadingActivity) return <Typography>Loading activity...</Typography>

  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
          {activity == undefined? "Create Activity": "Edit Activity"} 
           
        </Typography> 
    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>
          {/* <TextField {...register('title')} 
                      label='Title' 
                      defaultValue={activity?.title}
                      error={!!errors.title}
                      helperText={errors.title?.message}/> */}
           <TextInput label='Title' control={control} name='title'/>
          <TextInput label='Description' control={control} name='description' multiline rows={3}/>
          <Box display='flex' gap={3}>
                    <SelectInput
                        items={categoryOptions}
                        label='Category'
                        control={control}
                        name='category'
                    />
                    <DateTimeInput label='Date' control={control} name='date' />
                </Box>
          <LocationInput control={control} label='Enter the location' name='location'/>
          {/* <TextField  {...register('date')}  label='Date' type='date' defaultValue={activity?.date?
            new Date(activity.date).toISOString().split('T')[0]
            :new Date().toISOString().split('T')[0]
          }/>
         */}
          <Box display='flex' justifyContent='end' gap={3}>
              <Button color='inherit'>Cancel</Button>
              <Button type='submit'  color='success' variant='contained' disabled={updateActivity.isPending || createActivity.isPending}>Submit</Button>
          </Box>
    </Box>
    </Paper>
  )
}

export default ActivityForm












