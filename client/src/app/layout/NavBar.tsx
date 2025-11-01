import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography,  } from "@mui/material";

interface Props {
     createFormDisplay: boolean;
     setCreateFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
     allowCreateFormDisplay: (id?: string | undefined) => void;
  }
  


export default function NavBar({allowCreateFormDisplay}: Props){


  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)'}}>
            <Container maxWidth='xl'>
                <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
                   <MenuItem sx={{display:'flex', gap:2}}>
                         <Group sx={{fontSize:'large'}}/>
                         <Typography variant="h4" fontWeight='bold'>JoinUp</Typography>
                   </MenuItem>
                   <Box sx={{display:'flex'}}>

                        <MenuItem sx={{fontSize: '1.2rem', textTransform:'uppercase', fontWeight: 'bold'}}>
                          Activities
                       </MenuItem>
                       <MenuItem sx={{fontSize: '1.2rem', textTransform:'uppercase', fontWeight: 'bold'}}>
                          About
                       </MenuItem>
                        <MenuItem sx={{fontSize: '1.2rem', textTransform:'uppercase', fontWeight: 'bold'}}>
                          Contact
                       </MenuItem>
                   </Box>
                           
                   <Button size="large" variant='contained' color='warning' onClick={()=>allowCreateFormDisplay()}>Create Activity</Button>             
                </Toolbar>
            </Container>
           
        </AppBar>
        </Box>
  )
}

