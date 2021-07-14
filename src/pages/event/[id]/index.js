import {useRouter} from 'next/router';
import React, {useState} from 'react'
import mockData from '../../../../MockData/EventData.js';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import { shadows } from '@material-ui/system';
import Image from 'next/image';
import axios from 'axios'
import styles from '../../../styles/Event.module.css';
import generalStyles from '../../../styles/invite-page.module.css'
import SetTimeForm from '../../../components/SetTimeForm.js'
const testImage = 'https://wallpaperaccess.com/full/632782.jpg';

const Event = ({event}) => {
  const router = useRouter();
  const refeshData = () => {
    router.replace(router.asPath);
  }
  const [open, setOpen] = useState(false);
  //console.log(event)
  const test = event[0];
  const formatedDate = new Date(test.time).toLocaleString()
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
  <div className={generalStyles.window}>
    {/* <div className={generalStyles.title}>P L A N . I T</div> */}
    <div className={generalStyles.container}>
      <div>
        <Image
        src={testImage}
        className={generalStyles.photo}
        layout="responsive"
        height={144}
        width={1050}
        alt="event-image"
        />
        <div>
          <input
            className={styles.hidden}
            id="contained-button-file"
            multiple
            type="file"
            />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">  Upload
            </Button>
          </label>
        </div>
      </div>
      <div className={styles.mainsection}>
        <div className={styles.col}>
          <Box className={styles.header} boxshadow={3}>
          <h1>
              {test.name}
            </h1>
            <div className={styles.info}>
              <span> Status: {test.status}
              </span>
              <span>
                Location: {test.location}
              </span>
              <span>
                Length: {test.duration/(3600)} hours
              </span>
              <span>
                Event Time: {test.time ? formatedDate : 'Not set'}
              </span>
            </div>
          </Box>
          <Box >
            <Button variant="contained" component="span">
              Copy to Clipboard
            </Button>
          </Box>
          <Box >
            <SetTimeForm data={test} refeshData={refeshData}/>
          </Box>
        </div>
        <div className={styles.col}>
          <Box className={generalStyles.description} boxshadow={3}>
            <h3>Description</h3>
            <p>{test.description}</p>
          </Box>
        </div>
      </div>
    </div>
  </div>
  )
}

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
  //console.log(eventData)
  // res = await fetch(`http://localhost:3000/api/events`, {method: 'get', body: eventData})
  //const data = await res.json()
  var config = {
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
  //console.log(data)

  return {
    props: {event: data}, // will be passed to the page component as props
  }
}


export default Event