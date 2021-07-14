import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import { MultipleEventsData } from '../../MockData/EventData.js';
import Link from 'next/link'
import Event from '../components/Event';


 const useStyles = makeStyles({
   root: {
     marginRight: '1rem',
     width: '100%',
   },
   gridHeader: {
     width: '100%',
   },
   button: {
     marginLeft: '1em',
   }

 })








const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" alignItems="center" spacing={6}>
        <Grid container
          className={classes.gridHeader}
          alignItems="center"
          justifyContent="center"
          direction="row"
        >
          <Grid item xs={2}>
            <TextField
              margin="dense"
              className={classes.root}
              id="outlined-basic"
              label="Search"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={1}>
            <Button className={classes.button} >Test</Button>
          </Grid>
        </Grid>
        {MultipleEventsData.map( event => (
          <Grid item key={Math.random()} xs={6}>
            <Event {...event['1']}/>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;