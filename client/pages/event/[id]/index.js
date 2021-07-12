import {useRouter} from 'next/router';
import React, {useState} from 'react'
import mockData from '../../../../MockData/EventData.js';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal'
import IconButton from '@material-ui/core/IconButton';
import styles from '../../../styles/Event.module.css';
import SetTimeForm from '../../../components/SetTimeForm.js'
const Event = () => {
  // const router = useRouter()
  // const {id} = router.query
  const [open, setOpen] = useState(false);
  const test = mockData.SingleEventData[1];

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
  <div className={styles.container}>
    <div className={styles.photo}>
      {/* <image>
        test
      </image> */}
      <div>
        <input
          className={styles.hidden}
          id="contained-button-file"
          multiple
          type="file"
          />
        <label htmlFor="contained-button-file">

          <Button variant="contained" color="primary" component="span">  Upload
          </Button>
        </label>
      </div>
    </div>
    <div className={styles.mainsection}>
      <div className={styles.col1}>
        <div className={styles.nameInfo}>
          <h1>
            {test.name}
          </h1>
          <div className={styles.flexrows}>
            <h2>
              <a href="/">Status</a>
            </h2>
            <h2>
              <a href="/">location</a>
            </h2>
          </div>
        </div>
        <Button variant="contained" color="primary" component="span">
          Copy to Clipboard
        </Button>
        <SetTimeForm />
        {/* <Button variant="contained" color="primary" component="span" onClick={handleOpen}>
          Set Event Time
        </Button>
        <Modal
          open={open}
          className={styles.tempModal}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
         <div id='test33'>test</div>
        </Modal> */}
      </div>
      <div className={styles.col2}>
        <div className={styles.desBox}>
          <h3>Description</h3>
          <p>{test.description}</p>
        </div>
      </div>
    </div>
  </div>
  )
}

// export const getServerSideProps = async (context) => {
//   const res = await fetch
// }

export default Event