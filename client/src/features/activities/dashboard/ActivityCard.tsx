import  { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

interface Props {
    activity: Activity;
    setSelectCard : React.Dispatch<React.SetStateAction<string>>;
    setCreateFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const ActivityCard = ({activity, setSelectCard, setCreateFormDisplay}:Props) => {

  function showDetial(index:string):void {
    setCreateFormDisplay(false);
    setSelectCard(index);
  }

  return (
    <Card sx={{borderRadius: 3}}>
        <CardContent>
           <Typography variant="h5">{activity.title}</Typography>
           <Typography sx={{color:'text.secondary', mb:1}}>{activity.date.toLocaleString()}</Typography>
           <Typography variant="body2">{activity.description}</Typography>
           <Typography variant="subtitle1">{activity.city}/{activity.venue}</Typography>
        </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'space-between', pb: 2}}>
            <Chip label={activity.category} variant="outlined"/>
            <Button size='medium' variant="contained" onClick={()=>{showDetial(activity.id)}}>View</Button>
        </CardActions>
    </Card>
  )
}

export default ActivityCard
