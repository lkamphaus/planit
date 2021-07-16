import {useRouter} from 'next/router';
import React, {useState} from 'react'
import mockData from '../../../../MockData/EventData.js';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { shadows } from '@material-ui/system';
import Image from 'next/image';
import axios from 'axios'
import styles from '../../../styles/Event.module.css';
import generalStyles from '../../../styles/invite-page.module.css';
import SetTimeForm from '../../../components/SetTimeForm.js';
import UpdateEventForm from '../../../components/UpdateEventForm.js';
import helpers from '../../../components/tempHelp.js';
const testImage = 'https://wallpaperaccess.com/full/632782.jpg';

const Event = ({event}) => {
  const router = useRouter();
  const refeshData = () => {
    router.replace(router.asPath);
  }
  const [open, setOpen] = useState(false);
  const [uploads, setUploads] = useState('');
  const [uploaded, setUploaded] = useState(false);
  //console.log(event)
  const test = event[0];
  const formatedDate = new Date(test.time).toLocaleString();
  const formatedStartWindow = new Date(test.window.start).toLocaleString();
  const formatedEndWindow = new Date(test.window.end).toLocaleString();
  const rsvpList = helpers.listRSVPs(test.rsvps, 'name')
  const onFileChange = async (event) => {
    const image = event.target.files[0];

    const formData = new FormData();
    formData.append(0, image);

    try {
      const response = await fetch('/api/events/photos', {
        method: 'POST',
        body: formData
      })
      const url = await response.text();
      console.log(url)
      setUploaded(true);
      setUploads(url);
    } catch(err) {
      console.log(err)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const cancelPhoto = () => {
    setUploaded(false);
    setUploads('')
  }
  const savePhoto = async () => {
    const data = {
      "updates": [
        {
            "where": {
                "property": "_id",
                "value": test._id
            },
            "what": {
                "method": "$set",
                "field": "photo_url",
                "value": uploads
            }
        }
    ]
    }
    try {
      const res = await fetch('/api/events',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        }
      )
    } catch(err) {
      console.log(err);
    }
  }
  return (
  <div className={generalStyles.window}>
    {/* <div className={generalStyles.title}>P L A N . I T</div> */}
    <div className={styles.container}>
      <div>
        {uploaded && uploads ?
        <>
        <Image
        className={generalStyles.photo}
        src={uploads}
        layout="responsive"
        height={144}
        width={1050}
        alt="event-image"
        />
        <label>
          <Button variant="contained" component="span" onClick={savePhoto}>  Save
            </Button>
        </label>
        <label>
          <Button variant="contained" component="span" onClick={cancelPhoto}>  Cancel
            </Button>
        </label>
        </>
        :
        <>
        <Image
        src={test.photo_url ? test.photo_url : testImage}
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
            onChange={onFileChange}
            type="file"
            />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span">  Upload
            </Button>
          </label>
        </div>
        </>
        }
      </div>
      <div className={styles.mainsection}>
        <div className={styles.col}>
          <Paper className={styles.header} papershadow={3}>
          <h1>
              {test.name}
            </h1>
            <div className={styles.info}>
              <span> <b>Status:</b> {test.status}
              </span>
              <span> <b>Time Frame:</b> {formatedStartWindow} to {formatedEndWindow} </span>
              <span>
                <b>Event Time:</b> {test.time ? formatedDate : 'Not set'}
              </span>
              <span>
                <b>Current RSVPs:</b> {rsvpList.join(', ')}
              </span>
            </div>
          </Paper>
            <Button variant="contained" component="span" onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/invite-page/${test._id}`)}}>
              Copy Link to Event
            </Button>
            <SetTimeForm data={test} refeshData={refeshData}/>
        </div>
        <div className={styles.col}>
          <Paper className={generalStyles.description} papershadow={3}>
            <UpdateEventForm data={test} refeshData={refeshData}/>
          </Paper>
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
  if (!data || data.length === 0) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }
  //console.log(data)

  return {
    props: {event: data}, // will be passed to the page component as props
  }
}

export default Event;
