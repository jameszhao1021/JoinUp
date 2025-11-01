import { Box, Container, CssBaseline } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {

  
 const [activities, setActivities] = useState<Activity[]>([]);
 const [selectCard, setSelectCard] = useState<string>('')
 const [createFormDisplay,setCreateFormDisplay] = useState<boolean>(false)

function allowCreateFormDisplay(id?:string):void{
  setSelectCard('');
  if (!id && createFormDisplay == false){
    
    setCreateFormDisplay(true)
  } else if (id){
      setCreateFormDisplay(false);
      setSelectCard(id);
      setCreateFormDisplay(true)
  }
}

    function cancelSelectCard():void {
        setSelectCard("");
        setCreateFormDisplay(false);
    }

  useEffect(()=>{
     axios.get<Activity[]>('https://localhost:5001/api/activities')
     .then(res=>setActivities(res.data))
  },[])

  return (
    <Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline/>
    <NavBar createFormDisplay={createFormDisplay} setCreateFormDisplay={setCreateFormDisplay} allowCreateFormDisplay={allowCreateFormDisplay}/>
    <Container maxWidth='xl' sx={{mt:3}}>     
      <ActivityDashboard activities={activities} selectCard={selectCard} setSelectCard={setSelectCard} createFormDisplay={createFormDisplay} setCreateFormDisplay={setCreateFormDisplay} allowCreateFormDisplay={allowCreateFormDisplay} cancelSelectCard={cancelSelectCard}/>
    </Container>
   
    </Box>
  )
}

export default App
