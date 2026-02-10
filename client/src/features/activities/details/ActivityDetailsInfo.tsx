import { CalendarToday, Info, Place } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { formatDate } from "../../../lib/types/util/util";
import { Activity } from "../../../lib/types";
import { useSVGOverlay } from "react-leaflet/SVGOverlay";
import MapComponent from "../../../app/layout/shared/components/MapComponent";
import { useState } from "react";

interface props {
    activity: Activity
}

export default function ActivityDetailsInfo({activity}:props) {
    const [mapOpen, setMapOpen] = useState(false)
    return (
        <Paper sx={{ mb: 2 }}>

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Info color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{activity.description}</Typography>
                </Grid>
            </Grid>
            <Divider />
            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <CalendarToday color="info" fontSize="large" />
                </Grid>
                <Grid size={11}>
                    <Typography>{formatDate(activity.date)}</Typography>
                </Grid>
            </Grid>
            <Divider />

            <Grid container alignItems="center" pl={2} py={1}>
                <Grid size={1}>
                    <Place color="info" fontSize="large" />
                </Grid>
                <Grid size={11} display='flex' justifyContent='space-between' alignContent='center'>
                    <Typography>
                        {activity.venue}, {activity.city}
                    </Typography>
                    <Button onClick={()=>setMapOpen(!mapOpen)}>
                        {mapOpen? 'Hide map' : 'Show map'}
                    </Button>
                </Grid>
            </Grid>
            {mapOpen &&(
                <Box sx={{height: 400, zIndex:1000, display:'block'}}>

                    <MapComponent position={[activity.latitude, activity.longitude]} venue={activity.venue}/>
                </Box>
            )}
        </Paper>
    )
}
