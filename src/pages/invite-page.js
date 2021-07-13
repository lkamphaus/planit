import styles from '../styles/invite-page.module.css';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { shadows } from '@material-ui/system';

import Head from 'next/head';
import Image from 'next/image';

import eventData from '../../MockData/EventData.js'
const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const event = eventData.SingleEventData['1'];
// const event = eventData.ConfirmedEventData['1'];
// console.log('confirmed event data:', event);

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
      // POST REQUEST GOES HERE
      // which endpoint? what format will the object be in?
        // POST /rsvp: {name: "jacky", email: "jacky@gmail.com"}
      console.log('submitted data:', data);
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

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div className={styles.window}>
      <div className={styles.title}>P L A N . I T</div>

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
          <Box className={styles.date_box} boxshadow={3}>
            <div className={styles.date_banner}></div>
            <div className={styles.date}>{dateDay(event.window.start)}</div>
          </Box>
        }

        <div className={styles.body}>
          <div className={styles.info}>
            <div className={styles.details}>
              <Box className={styles.header} boxShadow={3}>
                <div className={styles.invite_title}>{event.owner} invites you to join {event.name}!</div>
                <div className={styles.subtitle}>
                  {status === 'pending' &&
                  <div className={styles.status}>Pending</div>
                  }
                  <div>{event.location}</div>
                </div>
              </Box>
              <Box className={styles.description} boxShadow={3}>
                {event.description}
              </Box>
            </div>
        </div>

          <Box className={styles.form} boxShadow={3}>
            <form onSubmit={handleSubmit(onSubmit)}  boxShadow={3}>
              <label>Name:</label>
              <input className={styles.input} {...register('name', { required: 'Please enter your name.' })}/>
              <label>Email:</label>
              <input type="email" className={styles.input} {...register('email', { required: 'Please enter your email.' })}/>
              {status === 'pending' &&
              <Button variant="contained" className={classes.button} onClick={handleOpen}>Add Availability</Button>
              }
                <Modal
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
                      <h2 id="transition-modal-title">SAMPLE MODAL</h2>
                      <p id="transition-modal-description">This is a placeholder for the Add Availability modal window.</p>
                    </div>
                  </Fade>
                </Modal>
              <Button type="submit" variant="contained" className={classes.button}>RSVP</Button>
            </form>
          </Box>
        </div>
      </div>
    </div>
  )
};

export default InvitePage;
