import styles from '../styles/invite-page.module.css';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';

import Head from 'next/head';
import Image from 'next/image';
import Availability from '.././components/Availability.js';

import eventData from '../../MockData/EventData.js'
const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const event = eventData.SingleEventData['1'];
// const event = eventData.ConfirmedEventData['1'];

const useStyles = makeStyles({
  button: {
    width: '100%',
    margin: '10px 0 5px 0',
    '&:hover': {
      color: 'white',
      background: '#98609c'
    }
  },
})

const InvitePage = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [avail, setAvail] = useState([]); // pass this down to modal
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (event.status === 'pending') {
      setStatus('pending');
    } else {
      setStatus('confirmed');
    }
  }, [])

  const { register, handleSubmit } = useForm({
    revalidateMode: 'onSubmit',
    shouldUseNativeValidation: true
  });

  const onSubmit = (data) => {
    if (avail.length === 0 && status === 'pending') {
      alert('Please provide your availability!');
    } else {
      // PUT REQUEST GOES HERE
        // For confirmed RSVP:
          // {name: "jacky", email: "jacky@gmail.com"}
        // For pending RSVP:
          /*
            {
              name: "jacky",
              email: "jacky@gmail.com",
              availability: [
                {
                  start: '2021-07-10T23:00:00.002Z',
                  end: '2021-07-11T02:00:00.002Z',
                },
                {
                  start: '2021-07-10T03:00:00.002Z',
                  end: '2021-07-10T06:00:00.002Z',
                },
              ]
            }
            */

      // axios.put('/route', { update })

      // let update = [{
      //     'where': {
      //       'property': '_id',
      //       'value': 'asdf'
      //     },
      //     'what': {
      //       'method': '$push', // adds to the back of the arraylook at update methods on mongodb for more methods
      //       'field': 'rsvps',
      //       'value': {
      //         'name': 'name',
      //         'availability': [
      //           {
      //             start: '2021-07-10T23:00:00.002Z',
      //             end: '2021-07-11T02:00:00.002Z',
      //           },
      //           {
      //             start: '2021-07-10T03:00:00.002Z',
      //             end: '2021-07-10T06:00:00.002Z',
      //           },
      //         ]
      //       }
      //     }
      //   }
      // ]

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
          <Paper className={styles.date_Paper} Papershadow={3}>
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
<<<<<<< HEAD

          <Paper className={styles.form} PaperShadow={3}>
            <form onSubmit={handleSubmit(onSubmit)}  PaperShadow={3}>
              <label>Name:</label>
              <input className={styles.input} {...register('name', { required: 'Please enter your name.' })}/>
              <label>Email:</label>
              <input type="email" className={styles.input} {...register('email', { required: 'Please enter your email.' })}/>
              {status === 'pending' &&
              <Button variant="contained" className={classes.button} onClick={handleOpen}>Add Availability</Button>
              }
              <AvailabilitySelection handleClose={handleClose} handleClickOpen={handleOpen} open={open}/>
              <Button type="submit" variant="contained" className={classes.button}>RSVP</Button>
            </form>
          </Paper>
=======
          <Box className={styles.form} boxshadow={3}>
          <form onSubmit={handleSubmit(onSubmit)}  boxshadow={3}>
            <label>Name:</label>
            <input className={styles.input} {...register('name', { required: 'Please enter your name.' })}/>
            <label>Email:</label>
            <input type="email" className={styles.input} {...register('email', { required: 'Please enter your email.' })}/>
            {pending &&
            <button className={styles.submit_form} onClick={handleOpen}>Add Availability</button>
            }
            <Availability handleClose={handleClose} handleClickOpen={handleOpen} open={open}/>
              {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                className={styles.modal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <div>
                    <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                  </div>
                </Fade>
              </Modal> */}
            <input type="submit" className={styles.rsvp_btn} value="RSVP"/>
          </form>
          </Box>
>>>>>>> 996f63fc264c9bcca7c0aec782da57f6cba214fe
        </div>
      </div>
    </div>
  )
};

export default InvitePage;
