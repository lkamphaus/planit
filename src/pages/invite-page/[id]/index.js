import styles from '../../../styles/invite-page.module.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';
import { TextField } from '@material-ui/core';

import Head from 'next/head';
import Image from 'next/image';
import Availability from '../../../components/Availability.js';

const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const useStyles = makeStyles({
  button: {
    width: '100%',
    margin: '10px 0 5px 0',
    '&:hover': {
      color: 'white',
      background: '#98609c'
    }
  },
  input: {
    margin: '5px 0 5px 0',
  }
});

const InvitePage = ({event}) => {
  event = event[0]

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [avail, setAvail] = useState([]); // pass this down to modal
  const { status } = event;

  const { register, handleSubmit } = useForm({
    revalidateMode: 'onSubmit',
    shouldUseNativeValidation: true
  });

  const onSubmit = (data) => {
    if (avail.length === 0 && status === 'pending') {
      alert('Please provide your availability!');
    } else {
      let updates;
      if (status === 'pending') {
        data.availability = avail;
        updates = [{
          'where': {
            'property': '_id',
            'value': event._id
          },
          'what': data
        }]
      } else {
        updates = [{
          'where': {
            'property': '_id',
            'value': event._id
          },
          'what': data
        }]
      }
      axios.put('/api/events', { updates })
        .then(response => console.log('Success!'))
        .catch(err => console.error(err));
    }
  }

  const dateDay = (date) => {
    date = date.substring(10, 8);
    if (date[0] === '0') {
      return date[1]
    } else {
      return date;
    }
  }
  dateDay(event.window.start)

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e, timeSlots) => {
    setOpen(false);
    setAvail(timeSlots);
  };

  return (
    <div className={styles.window}>
      <div className={styles.container}>

        <Image
          src={sampleImg}
          className={styles.photo}
          layout="responsive"
          height={144}
          width={1050}
          alt="event-image"
        />

        {status === 'confirmed' &&
          <Paper className={styles.date_box} Papershadow={3}>
            <div className={styles.date_banner}></div>
            <div className={styles.date}>{dateDay(event.window.start)}</div>
          </Paper>
        }

        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.details}>
              <Paper className={styles.header} PaperShadow={3}>
                <div className={styles.invite_title}>{event.owner} invites you to join {event.name}!</div>
                <div className={styles.subtitle}>
                  {status === 'pending' &&
                  <div className={styles.status}>Pending</div>
                  }
                  <div>{event.location}</div>
                </div>
              </Paper>
              <Paper className={styles.description} PaperShadow={3}>
                {event.description}
              </Paper>
            </div>
        </div>

          <Paper className={styles.form} PaperShadow={3}>
            <form onSubmit={handleSubmit(onSubmit)} PaperShadow={3}>
              <TextField id="outlined-basic" label="Name" variant="outlined" className={classes.input} {...register('name', { required: 'Please enter your name.' })} />
              <TextField id="outlined-basic" label="Email" variant="outlined" type="email" className={classes.input} {...register('email', { required: 'Please enter your email.' })} />
              {status === 'pending' &&
              <Button variant="contained" className={classes.button} onClick={handleOpen}>Add Availability</Button>
              }
              <Availability handleClose={handleClose} handleClickOpen={handleOpen} open={open}/>
              <Button type="submit" variant="contained" className={classes.button}>RSVP</Button>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  )
};

export async function getServerSideProps(context) {
  var eventData = JSON.stringify({
    "options": {
      "count": 1,
      "where": {
        "property": "_id",
        "value": context.params.id
      }
    }
  })

  let config = {
    method: 'get',
    url: 'http://localhost:3000/api/events',
    headers: {
      'Content-Type': 'application/json',
    },
    data : eventData
  };

  const response = await axios(config);
  const data = response.data

  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { event: data }
  }
}

export default InvitePage;
