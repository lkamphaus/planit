import { TextField, Grid } from '@material-ui/core';
import { MultipleEventsData } from '../../MockData/EventData.js';
import Event from '../components/Event';

const home = () => {

  return (
    <>
      <Grid container direction="column">
        <Grid item spaceing={6}>
          <TextField id="outlined-basic" label="Search" variant="outlined"/>
        </Grid>
        {MultipleEventsData.map( event => (
          <Grid item xs={4}>
            <Event {...event['1']} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default home;