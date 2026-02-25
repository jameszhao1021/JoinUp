import { Add, Group, Logout, Person } from "@mui/icons-material";
import { AppBar, Avatar, Box, Container, LinearProgress, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography,  } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useUsers } from "../../lib/hooks/useUsers";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function NavBar(){
  const navigate = useNavigate();
  const {uiStore} = useStore()
const {users, logoutUser} = useUsers();


const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
 const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

const onSubmit =  async() =>{
 try{
  
      handleClose();
      logoutUser.mutate(undefined,{
      onSuccess: () => navigate(``),
    })
   }
 catch(error){
  console.log(error)
 }
}

  return (
    <Box sx={{ flexGrow: 1 }}>
      
        <AppBar position="static" sx={{position:'relative' , backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'}}>
            <Container maxWidth='xl'>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                   <MenuItem component={NavLink} to ='/' sx={{display:'flex', gap:2}}>
                         <Group sx={{fontSize:'large'}}/>
                         <Typography variant="h4" fontWeight='bold'>JoinUp</Typography>
                   </MenuItem>
                   <Box sx={{display:'flex'}}>

                        {/* <MenuItemLink  to={users?.email ? "/activities" : "/loginPage"} >
                          Activities
                       </MenuItemLink>
                       <MenuItemLink to={users?.email ? "/createActivity" : "/loginPage"}>
                          Create Activity
                       </MenuItemLink> */}
                        
                   </Box>

  

      {users && (
      <MenuItem onClick={handleOpen}>
              <Box display='flex' alignItems='center' gap={2}>
                <Avatar />
                {users?.displayName}
              </Box>
            </MenuItem>
      )}
 
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
 <MenuItem  component={Link} to={'/createActivity'} onClick={handleClose}>
           <ListItemIcon>
            <Add />
           </ListItemIcon>
           <ListItemText>
                 Create Activity

           </ListItemText>
           
           </MenuItem>

       <MenuItem  component={Link} to={'/profile'} onClick={handleClose}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>
                    My profile
              </ListItemText>
           </MenuItem>

      <MenuItem  onClick={onSubmit}>
           <ListItemIcon>
               <Logout />
           </ListItemIcon>
           <ListItemText>
                 Logout
           </ListItemText>
           </MenuItem>
            </Menu>
         
                </Toolbar>
            </Container>
           <Observer>
            {
              ()=>
                uiStore.isLoading? (
                  <LinearProgress 
                    color="secondary"
                    sx={{
                      position:"absolute",
                      bottom:0,
                      left:0,
                      right:0,
                      height:4
                    }}
                  />
                ):null
              
            }
           </Observer>
        </AppBar>
        </Box>
  )
}

