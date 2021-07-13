import styles from '../styles/invite-page.module.css';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';

import Head from 'next/head';
import Image from 'next/image';
import AvailabilitySelection from '.././components/AvailabilitySelection.js';

import eventData from '../../MockData/EventData.js'
const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const event = eventData.SingleEventData['1'];

const InvitePage = () => {
  const [open, setOpen] = useState(false);
  const [avail, setAvail] = useState([]); // pass this down to modal
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (event.status === 'pending') {
      setPending(true);
    }
  }, [])

  const { register, handleSubmit } = useForm({
    revalidateMode: 'onSubmit',
    shouldUseNativeValidation: true
  });

  const onSubmit = (data) => {
    if (avail.length === 0) {
      alert('Please provide your availability!');
    }
  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = (e) => {
    setOpen(false);
  };

  return (
    <div className={styles.window}>
      {/* <div className={styles.title}>P L A N . I T</div> */}

      <div className={styles.container}>

      <Image
        src={sampleImg}
        className={styles.photo}
        layout="responsive"
        height={144}
        width={1050}
        alt="event-image"
      />

        <div className={styles.body}>
          <div className={styles.info}>

            <div className={styles.details}>

              <Box className={styles.header} boxshadow={3}>
                <div className={styles.invite_title}>{event.owner} invites you to join {event.name}!</div>
                <div className={styles.subtitle}>
                  {pending &&
                  <div className={styles.status}>Pending</div>
                  }
                  <div className={styles.location}>{event.location}</div>
                </div>
              </Box>

              <Box className={styles.description} boxshadow={3}>
                {event.description}
              </Box>
            </div>
        </div>
          <Box className={styles.form} boxshadow={3}>
          <form onSubmit={handleSubmit(onSubmit)}  boxshadow={3}>
            <label>Name:</label>
            <input className={styles.input} {...register('name', { required: 'Please enter your name.' })}/>
            <label>Email:</label>
            <input type="email" className={styles.input} {...register('email', { required: 'Please enter your email.' })}/>
            {pending &&
            <button className={styles.submit_form} onClick={handleOpen}>Add Availability</button>
            }
            <AvailabilitySelection handleClose={handleClose} handleClickOpen={handleOpen} open={open}/>
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
        </div>
      </div>
    </div>

  )
};

export default InvitePage;