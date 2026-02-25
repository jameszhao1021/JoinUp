import { Typography } from "@mui/material";
import { useUsers } from "./useUsers"
import { Navigate, Outlet, useLocation } from "react-router"

export default function RequireAuth(){
    const {users, loadingUserInfo} = useUsers();
    const location = useLocation();


   if (loadingUserInfo) return <Typography>Loading...</Typography>
  if (!users) return <Navigate to = '/loginPage' state = {{from: location}} />
  
  return (
    <Outlet/>
  )
  }