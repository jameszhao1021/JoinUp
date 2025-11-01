import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';

interface Props {
    activity: Activity;
    setSelectCard: React.Dispatch<React.SetStateAction<string>>;
    allowCreateFormDisplay: (id?: string | undefined) => void;
    setCreateFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
    cancelSelectCard: ()=>void;
}

export default function ActivityDetail({activity, allowCreateFormDisplay, cancelSelectCard}:Props) {


  return (
    <div>
        <Card sx={{borderRadius:3}}>
             <CardMedia 
             component='img'
             src={`/images/categoryImages/${activity.category}.jpg`}
             />
              <CardContent>
                  <Typography variant='h5'>{activity.title}</Typography>
                   <Typography variant='subtitle1' fontWeight='light'>{activity.title}</Typography>
                  <Typography variant='body1'>{activity.description}</Typography>                 
              </CardContent>
              <CardActions>
                 <Button color='primary' onClick={()=>allowCreateFormDisplay(activity.id)}>Edit</Button>
                <Button color='inherit' onClick={cancelSelectCard}>Cancel</Button>

              </CardActions>
        </Card>
    </div>
  )
}
