import {useRouter} from 'next/router';
import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import ImageIcon from '@material-ui/icons/Image';
import InputBase from '@material-ui/core/InputBase';
import CreateIcon from '@material-ui/icons/Create';
import InputAdornment from '@material-ui/core/InputAdornment';
import Image from 'next/image';
import axios from 'axios';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import accountContext from '.././accountContext.js';

import styles from '.././styles/Create.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 1050,
    margin: 'auto',
  },
  cardPhoto: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  cardInput: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  cardInputDescription: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    display: 'flex',
    width: '100%',
  },
  cardInputContainer: {
    width: '100%'
  },
  textDescription: {
    width: '100%'
  },
  createButton: {
    marginTop: '20px'
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.54)'
  },
  sideIcon: {
    color: 'rgba(0, 0, 0, 0.54)',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  inputField: {
    marginBottom: '20px'
  },
  eventWindow: {
    display: 'flex',
    flexDirection: 'column',
    color: '#a2a2a2'
  }
}));


export default function CreateEvent() {
  const classes = useStyles();

  const { name } = useContext(accountContext);

  const [form, setForm] = useState({
        name: "",
        duration: "",
        location: "",
        description: ""
  });

  const [windowStart, setWindowStart] = useState(new Date());
  const [windowEnd, setWindowEnd] = useState(new Date());

  const [uploads, setUploads] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleChange = () => (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setForm((prevState) => ({
        ...prevState,
        [name]: value
    }));
  };

  const handleStart = (event) => {
    setWindowStart(event.target.value)
  };

  const handleEnd = (event) => {
    setWindowEnd(event.target.value)
  };

  const onFileChange = async (event) => {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append(0, image);

    try {
      const response = await fetch(`/api/events/photos`, {
        method: 'POST',
        body: formData
       })
      const url = await response.text();
      setUploaded(true);
      setUploads(url);
    } catch(err) {
       console.log(err)
    }
  }

  const createNewEvent = async (e) => {
    e.preventDefault()

    form.duration = form.duration * 3600;
    form.window = {
      start: windowStart,
      end: windowEnd
    };
    form.photo_url = uploads;
    form.owner = name;

    let event = JSON.stringify(form);

    try {
      const res = await fetch('/api/events',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: event,
        }
      )
    } catch(err) {
      console.log(err);
    }
  };



  return (
    <div className={classes.root}>
      <form onSubmit={createNewEvent}>
        <Grid container spacing={3} >
        <Grid item xs={12}>
          { uploaded && uploads ?
            //  <Card className={classes.cardPhoto}>
              <Image
                className={classes.coverPhoto}
                src={uploads}
                layout="responsive"
                height={144}
                width={1050}
                alt="event-image"
              />
              // </Card>
            :
              <Card className={classes.cardPhoto}>
                <ImageIcon
                  className={styles.uploadIcon}
                />
                <input
                  className={styles.hidden}
                  id="contained-button-file"
                  type="file"
                  onChange={onFileChange}
                />
                <label htmlFor="contained-button-file">
                  <Button color="primary"
                    variant="contained"
                    component="span">
                      Choose File
                    </Button>
                </label>
              </Card>
           }
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.cardInput}>
            <InputBase
              className={classes.inputField}
              id="name"
              name="name"
              type="text"
              inputProps={{ 'aria-label': 'naked' }}
              required
              value={form.name}
              fullWidth={true}
              placeholder="Edit Event Name here"
              onChange={handleChange()}
              endAdornment={
                <InputAdornment position="end">
                  <CreateIcon className={classes.icon}/>
                </InputAdornment>
              }
            />
             <InputBase
             className={classes.inputField}
              id="duration"
              name="duration"
              type="text"
              inputProps={{ 'aria-label': 'naked' }}
              required
              value={form.duration}
              fullWidth={true}
              placeholder="Edit Event Duration here (hrs)"
              onChange={handleChange()}
              endAdornment={
                <InputAdornment position="end">
                  <CreateIcon className={classes.icon}/>
                </InputAdornment>
              }
            />
            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
            <div className={classes.eventWindow}>
              <label>Event Window</label>
              <DatePicker
                label="Start"
                value={windowStart}
                onChange={setWindowStart}
                animateYearScrolling
              />
              <DatePicker
                className={classes.inputField}
                label="End"
                value={windowEnd}
                onChange={setWindowEnd}
                animateYearScrolling
              />
            </div>
            </MuiPickersUtilsProvider>

             <InputBase
              className={classes.inputField}
              id="location"
              name="location"
              type="text"
              inputProps={{ 'aria-label': 'naked' }}
              required
              value={form.location}
              onChange={handleChange()}
              placeholder="Edit Event Location here"
              fullWidth={true}
              endAdornment={
                <InputAdornment position="end">
                  <CreateIcon className={classes.icon}/>
                </InputAdornment>
              }
            />
            </Card>
            <Button type="submit" variant="contained"  color="primary" className={classes.createButton}>
              Create Event
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Card className={classes.cardInputDescription}>
                <div  className={classes.cardInputContainer}>
                  <InputBase
                    // className={classes.inputField}
                    id="description"
                    name="description"
                    type="text"
                    className={classes.textDescription}
                    multiline={true}
                    placeholder="Edit Event Description here"
                    rows={10}
                    fullWidth={true}
                    inputProps={{ 'aria-label': 'naked' }}
                    required
                    value={form.description}
                    onChange={handleChange()}
                  />
                </div>
                <div className={classes.sideIcon}>
                  <CreateIcon className={classes.icon}/>
                </div>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

