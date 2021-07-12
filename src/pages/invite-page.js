import styles from '../styles/invite-page.module.css';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Image from 'next/image';

import eventData from '../../MockData/EventData.js'
const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

console.log('event data:', eventData.SingleEventData);
const event = eventData.SingleEventData;

const InvitePage = () => {
  const [open, setOpen] = useState(false);
  const [avail, setAvail] = useState([]); // pass this down to modal

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
        layout="fixed"
        height={144}
        width={1050}
        alt="event-image"
      />

        <div className={styles.body}>
          <div className={styles.info}>

            <div className={styles.details}>

              <div className={styles.header}>
                <div className={styles.invite_title}>{'[NAME]'} invites you to join {'[EVENT]!'}</div>
                <div className={styles.subtitle}>
                  <div className={styles.status}>Pending</div>
                  <div className={styles.location}>Location</div>
                </div>
              </div>

              <div className={styles.description}>
              According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don&#39;t care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let&#39;s shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can&#39;t. I&#39;ll pick you up. Looking sharp. Use the stairs, Your father paid good money for those. Sorrgity. I&#39;m excited.
              </div>
            </div>
        </div>

          <form className={styles.form}>
            <label>Name:</label>
            <input className={styles.input} required></input>
            <label>Email:</label>
            <input className={styles.input} required></input>
            <button className={styles.submit_form} onClick={handleOpen}>Add Availability</button>
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
                    <h2 id="transition-modal-title">Transition modal</h2>
                    <p id="transition-modal-description">react-transition-group animates me.</p>
                  </div>
                </Fade>
              </Modal>
            <button className={styles.rsvp_btn}>RSVP</button>
          </form>
        </div>

      </div>
    </div>
  )
};

export default InvitePage;
