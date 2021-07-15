import React, { useContext, useEffect, useState } from 'react';
import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import axios from 'axios';
import Link from 'next/link'

import Event from '../components/Event';
import Account from '../accountContext';



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

const Home = (props) => {
  const classes = useStyles();
  const { name, loggedIn } = useContext(Account);
  const [state, setState] = useState({
    initialized: false,
    events: [],
  });

  useEffect(() => {
    if (!state.initialized && loggedIn) {

      let data = {
        "options": {
          "count": 20,
          "where": {
            "property": "owner",
            "value": name
          }
        }
      };

      let config = {
        method: 'get',
        url: '/api/events',
        headers: {
          'Content-Type': 'application/json'
        },
        params: data
      };

      axios(config)
        .then(res => res.data)
        .then(events => {
          setState({
            initialized: true,
            events,
          })
        })
    }
  }, [state, name, loggedIn]);


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
            <Button className={classes.button} color="primary">Search</Button>
          </Grid>
        </Grid>
        {state.events.map(event => (
          <Grid item key={Math.random()} xs={6} >
            <Event {...event} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Home;
