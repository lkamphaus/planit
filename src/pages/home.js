import { TextField } from '@material-ui/core';
import { MultipleEventsData } from '../../MockData/EventData.js';
import Event from '../components/Event';

const home = () => {

  return (
    <>
      <TextField id="outlined-basic" label="Search" variant="outlined"/>
      {MultipleEventsData.map( event => <Event {...event['1']} /> )}
    </>
  );
}

export default home;