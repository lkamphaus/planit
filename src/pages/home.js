import { TextField, Grid } from '@material-ui/core';
import { MultipleEventsData } from '../../MockData/EventData.js';
import Event from '../components/Event';

const home = () => {

  return (
    <>
      <Grid container direction="column">
        <Grid item>
          <TextField id="outlined-basic" label="Search" variant="outlined"/>
        </Grid>
        {MultipleEventsData.map( event => (
          <Grid item>
            <Event {...event['1']} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default home;