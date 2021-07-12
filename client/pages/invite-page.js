import { useForm } from 'react-hook-form';
import styles from '../styles/invite-page.module.css';
import Image from 'next/image';

const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const InvitePage = () => {

  return (
    <div className={styles.container}>
      <div className={styles.title}>plan.it</div>
      <img className={styles.photo} src={sampleImg}></img>
      <div className={styles.info}>
        <div className={styles.invite_title}>NAME invites you to join his EVENT</div>
        <div className={styles.subtitle}>
          <div className={styles.status}>Pending</div>
          <div className={styles.location}>Location</div>
        </div>
        <div className={styles.body}>
          <div className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus cursus dictum. Integer volutpat fringilla consequat. Nullam blandit mauris eget diam dapibus, nec imperdiet nisi vestibulum.Nullam blandit mauris eget diam dapibus, nec imperdiet nisi vestibulum.Nullam blandit mauris eget diam dapibus, nec imperdiet nisi vestibulum.Nullam blandit mauris eget diam dapibus, nec imperdiet nisi vestibulum.
          </div>
          <form className={styles.form}>
            <label>Name:</label>
            <input className={styles.input}></input>
            <label>Email:</label>
            <input className={styles.input}></input>
            <button className={styles.submit_form}>Add Availability</button>
          </form>
        </div>
        <button className={styles.rsvp_btn}>RSVP</button>
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