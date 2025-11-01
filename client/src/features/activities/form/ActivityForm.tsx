import  { Paper, Typography, Box, TextField, Button } from "@mui/material"


interface Props {
     createFormDisplay: boolean;
     setCreateFormDisplay: React.Dispatch<React.SetStateAction<boolean>>;
     selectedActivity?: Activity;
  }

const ActivityForm = ({createFormDisplay, setCreateFormDisplay, selectedActivity}: Props) => {

function cancelCreateFormDisplay():void{
  if (createFormDisplay !=false){
    setCreateFormDisplay(false)
  } 
}
  return (
    <Paper sx={{borderRadius: 3, padding: 3}}>
        <Typography variant='h5' gutterBottom color='primary'>
             Create Activity 
        </Typography> 
    <Box component='form' display='flex' flexDirection='column' gap={3}>
          <TextField label='Title' value={selectedActivity?.title}/>
          <TextField label='Description' multiline rows={3} value={selectedActivity?.description}/>
          <TextField label='Category' value={selectedActivity?.category}/>
          <TextField label='Date' type='date' value={selectedActivity?.date}/>
          <TextField label='City' value={selectedActivity?.city}/>
          <TextField label='Venue' value={selectedActivity?.venue}/>
          <Box display='flex' justifyContent='end' gap={3}>
              <Button color='inherit' onClick={cancelCreateFormDisplay}>Cancel</Button>
              <Button color='success' variant='contained'>Submit</Button>
          </Box>
    </Box>
    </Paper>
  )
}

export default ActivityForm
