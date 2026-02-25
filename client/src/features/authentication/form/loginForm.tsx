import  { Paper, Box, Button, Typography } from "@mui/material"
import { useUsers } from "../../../lib/hooks/useUsers";
import { Link, useNavigate, useLocation } from "react-router";
import { Resolver, useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "../../../lib/schemas/loginSchema";
import {zodResolver} from '@hookform/resolvers/zod'
import TextInput from "../../../app/layout/shared/components/TextInput";
import  {User}  from "../../../lib/types";
import { useState } from "react";
import { LockOpen } from "@mui/icons-material";

const LoginForm = () => {
 const location = useLocation();
  const navigate  = useNavigate();
const [errorDisplay, setErrorDisplay] = useState<boolean>(false);


const { control, handleSubmit, formState:{isValid, isSubmitting} } = useForm<LoginSchema>({
  mode: "onTouched",
  resolver: zodResolver(loginSchema) as Resolver<LoginSchema>,
});



const {loginUser} = useUsers();




// new approach
const onSubmit =  async(data: LoginSchema) =>{
  
 try{
      loginUser.mutate(data as User,{
      onSuccess: () => { 
        navigate (location.state?.from || '/activities')         
      },
      onError:(error)=>{
          console.log(error)
          setErrorDisplay(true)
      }
    })
   }
 catch(error){
  console.log(error)
 }
}



  return (
    <Paper sx={{borderRadius: 3, padding: 3, marginX: 20}}>
    <Box display='flex' justifyContent='center' marginBottom={3} gap={3} color='secondary.main' alignItems='center'>
        <LockOpen fontSize='large'/>
        <Typography variant="h3" >Sign in</Typography>

    </Box>

    <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3} >

           <TextInput label='Email' control={control} name='email'/>
          <TextInput label='Password' type='password' control={control} name='password'/>
          {errorDisplay && (
             <Typography sx={{color:'red'}}>Username or password is wrong</Typography>
          )}
        
       
          <Box display='flex' gap={3} >
              <Button type='submit' color='primary' variant='contained' sx={{width:'100%'}} disabled={!isValid || isSubmitting}>Login</Button>
          </Box>
           <Box display='flex' justifyContent='center' alignItems='center' gap={3}>
            <Typography>Don't have an account?</Typography>
              <Typography color='primary' component={Link} to='/registerPage'  >Sign up</Typography>
          </Box>
    </Box>
    </Paper>
  )
}

export default LoginForm






