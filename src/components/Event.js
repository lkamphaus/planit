import { Card , useTheme } from '@material-ui/core';


const Event = ({
  name, description, owner, location, duration, status, time, window, rsvps
}) => {

  const theme = useTheme();

  return (
    <Container>
      {name}
      {description}
      {owner}
    </Container>
  )
}

export default Event;
