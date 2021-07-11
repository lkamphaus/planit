import { useForm } from 'react-hook-form';
import styles from '../styles/invite-page.module.css';
import Image from 'next/image';

const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const InvitePage = () => {
  return (
    <div className={styles.container}>
      <img src={sampleImg} className={styles.photo}/>

      <div className={styles.info}>
        <div>Event Name</div>
        <div>Location</div>
        <div>Description</div>
      </div>

      <div className={styles.rsvp}>

        <div>Name</div>
        <div>Email</div>
        <button>RSVP</button>
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