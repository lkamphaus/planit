import { Container, Box , useTheme, Typography, Grid } from '@material-ui/core';


const Event = ({
  name, description, owner, location, duration, status, time, window, rsvps
}) => {

  return (
      <Box>
        <Typography variant="h6">{name}</Typography>
        {description}
        {owner}
      </Box>
  )
}

export default Event;
