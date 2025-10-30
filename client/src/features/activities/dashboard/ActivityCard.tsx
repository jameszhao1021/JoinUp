import  { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

interface Props {
    activity: Activity;
}

const ActivityCard = ({activity}:Props) => {
  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
           <Typography variant="h5">{activity.title}</Typography>
           <Typography sx={{color:'text.secondary', mb:1}}>{activity.date.toLocaleString()}</Typography>
           <Typography variant="body2">{activity.Description}</Typography>
           <Typography variant="subtitle1">{activity.city}/{activity.venue}</Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'space-between', pb: 2}}>
            <Chip label={activity.category} variant="outlined"/>
            <Button size='medium' variant="contained">View</Button>
        </CardActions>
    </Card>
  )
}

export default ActivityCard
