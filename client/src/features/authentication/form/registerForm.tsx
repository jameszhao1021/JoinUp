
import  { Paper, Box, Button, Typography } from "@mui/material"
import { useUsers } from "../../../lib/hooks/useUsers";
import { Link, useNavigate } from "react-router";
import { Resolver, useForm } from "react-hook-form";
import { userSchema, UserSchema } from "../../../lib/schemas/userSchema";
import {zodResolver} from '@hookform/resolvers/zod'
import TextInput from "../../../app/layout/shared/components/TextInput";
import { User } from "../../../lib/types";
import { LockOpen } from "@mui/icons-material";

export default function RegisterForm() {
  const {control, handleSubmit, formState:{isValid, isSubmitting}} = useForm<UserSchema>({
  mode: "onTouched",
  reValidateMode: "onBlur",
  resolver: zodResolver(userSchema) as Resolver<UserSchema>,
});

const navigate = useNavigate();
const {registerUser} = useUsers();

// new approach
const onSubmit =  async(data: UserSchema) =>{
      registerUser.mutate(data as User,{
      onSuccess: () => navigate(`/loginPage`)
    })
}

 return (
    <Paper sx={{ borderRadius: 3, padding: 3, marginX: 20,}}>
      <Box display='flex' justifyContent='center' marginBottom={3} gap={3} color='secondary.main' alignItems='center'>
          <LockOpen fontSize='large'/>
          <Typography variant="h3" >Register</Typography>
      </Box>

      <Box component='form' onSubmit={handleSubmit(onSubmit)} display='flex' flexDirection='column' gap={3}>

            <TextInput label='User name' control={control} name='displayName'/>
            <TextInput label='Email' control={control} name='email'/>
            <TextInput label='Password' control={control} name='password'/>
        
            <Box display='flex' justifyContent='center' gap={3} >
                <Button sx={{width:'100%'}} type='submit' color='success' variant='contained' disabled={!isValid || isSubmitting}>Register</Button>
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center' gap={3}>
              <Typography>Already have an account?</Typography>
                <Typography color='primary' component={Link} to='/loginPage' >Sign in</Typography>
            </Box>
      </Box>
    </Paper>
  )
}
