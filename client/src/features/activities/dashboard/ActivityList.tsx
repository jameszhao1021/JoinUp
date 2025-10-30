import  { Box} from '@mui/material'
import ActivityCard from './ActivityCard';

interface Props {
    activities: Activity[];
}

const ActivityList = ({activities}:Props) => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:3}}>

           {activities.map(activity=>(
          <ActivityCard key={activity.id} activity={activity}/>
        ))}
    </Box>
  )
}

export default ActivityList
