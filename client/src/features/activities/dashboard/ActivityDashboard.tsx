import {Grid} from '@mui/material'
import ActivityList from './ActivityList';
import ActivityDetail from '../details/ActivityDetail';
import ActivityForm from '../form/ActivityForm';

interface Props {
     activities: Activity[]; 
     selectCard: string;
     setSelectCard: React.Dispatch<React.SetStateAction<string>>;
     createFormDisplay: boolean;
     setCreateFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
     allowCreateFormDisplay: (id?: string | undefined) => void;
     cancelSelectCard: ()=>void;
  }
  
export default function ActivityDashboard({activities, selectCard, setSelectCard, createFormDisplay, setCreateFormDisplay, allowCreateFormDisplay, cancelSelectCard}:Props) {

const selectedActivity = activities.find(i => i.id === selectCard);

  return (
    <>
     <Grid container spacing={3}>
         <Grid size={7} >
              <ActivityList activities={activities} setSelectCard={setSelectCard} setCreateFormDisplay={setCreateFormDisplay}/>
         </Grid>
         <Grid size={5} display='flex' flexDirection='column' gap={4}>
             {selectedActivity && <ActivityDetail activity= {selectedActivity} setSelectCard={setSelectCard} setCreateFormDisplay={setCreateFormDisplay} allowCreateFormDisplay={allowCreateFormDisplay} cancelSelectCard={cancelSelectCard}/>}
             {createFormDisplay && !selectedActivity &&
                 <ActivityForm createFormDisplay={createFormDisplay} setCreateFormDisplay={setCreateFormDisplay}/>
             }
              {createFormDisplay && selectedActivity &&
                 <ActivityForm createFormDisplay={createFormDisplay} setCreateFormDisplay={setCreateFormDisplay} selectedActivity={selectedActivity}/>
             }
         </Grid>
     </Grid>
    </>

  )
}
