import React, {useState, useRef } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from '../styles/Event.module.css';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
const UpdateEventForm = (props) => {
  const [open, setOpen] = useState(false);
  const {register, handleSubmit, control } = useForm({
    defaultValues: {
      description: props.data.description,
      location: props.data.location,
      duration: props.data.duration/3600
    }
  })
  const onSubmit = data => {
    let updates = [];
    data.duration = data.duration * 3600
    for (var k in data) {
      //console.log(data[k])
      if (data[k] !== props.data[k]) {
        updates.push(
          {
            "where": {
                "property": "_id",
                "value": props.data._id
            },
            "what": {
                "method": "$set",
                "field": k,
                "value": data[k]
            }
        })
      }
    }
    console.log(updates)
    var config = {
      method: 'put',
      url: 'http://localhost:3000/api/events',
      headers: {
        'Content-Type': 'application/json',
      },
      data : {updates: updates}
    };
    axios(config).then( res => {
      setOpen(false);
      props.refeshData()
    }).catch(err => {
      console.log(err)
    })
    //setOpen(false)
  }
  if(open) {
    return (
      <div className={styles.info}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h3>
              Location:
            </h3>
            <textarea className={styles.descriptionText} rows='1' {...register("location")} />
          </label>
          <label className={styles.descriptionText}>
            <h3>
              Duration:
            </h3>
            <div className={styles.flex}>
            <input className={styles.info} step="0.5" type="number" {...register("duration")}/> hours
            </div>
          </label>
          <label>
            <h3>Description:</h3>
            <textarea className={styles.descriptionText} rows='5' {...register("description")} />
          </label>
          <div>
            <Button type="submit">
              Save
            </Button>
            <Button onClick={() => {setOpen(false)}}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div className={styles.info}>
      <div>
        <h3>Location:</h3><p>{props.data.location}</p>
      </div>
      <div>
        <h3>Duration:</h3><p>{props.data.duration/3600} hours</p>
      </div>
      <h3>Description:</h3>
      <p>{props.data.description}</p>
      <div>

      <Button onClick={() => {setOpen(true)}}>
        Edit
      </Button>
      </div>
    </div>
  )
}


export default UpdateEventForm;