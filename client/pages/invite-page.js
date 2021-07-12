import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from '../styles/invite-page.module.css';
import Image from 'next/image';
import Modal from '@material-ui/core/Modal';


import eventData from '../../MockData/EventData.js'
const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

console.log(eventData.SingleEventData);
const event = eventData.SingleEventData;

const InvitePage = () => {
  const [modal, setModal] = useState(false);
  const [avail, setAvail] = useState([]); // pass this down to modal

  const toggleModal = () => {
    setModal(true);
  }

  return (
    <div className={styles.window}>
      <div className={styles.title}>P L A N . I T</div>

      <div className={styles.container}>

        <img className={styles.photo} src={sampleImg}></img>

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
              According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible. Yellow, black. Yellow, black. Yellow, black. Yellow, black. Ooh, black and yellow! Let's shake it up a little. Barry! Breakfast is ready! Coming! Hang on a second. Hello? Barry? Adam? Can you believe this is happening? I can't. I'll pick you up. Looking sharp. Use the stairs, Your father paid good money for those. Sorrgity. I'm excited.
              </div>
            </div>
        </div>

          <form className={styles.form}>
            <label>Name:</label>
            <input className={styles.input} required></input>
            <label>Email:</label>
            <input className={styles.input} required></input>
            <button className={styles.submit_form} onClick={toggleModal}>Add Availability</button>
            <button className={styles.rsvp_btn}>RSVP</button>
          </form>
        </div>

      </div>
    </div>
  )
};

export default InvitePage;

// <Image
// src={sampleImg}
// layout="fixed"
// height={144}
// width={700}
// alt="event-image"
// />
