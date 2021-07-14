import React, {useState, useRef } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styles from '../styles/Event.module.css';
import { useForm, Controller } from 'react-hook-form';
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
    console.log(data);
    setOpen(false)
  }
  if(open) {
    return (
      <>
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
            <input type="number" {...register("duration")}/> hours
          </label>
          <label>
            <h3>Description:</h3>
            <textarea className={styles.descriptionText} rows='5' {...register("description")} />
          </label>
          <div>
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
        <Button onClick={() => {setOpen(false)}}>
          Cancel
        </Button>
      </>
    )
  }
  return (
    <div>
      <div>
        <h3>Location:</h3><p>{props.data.location}</p>
      </div>
      <div>
        <h3>Duration:</h3><p>{props.data.duration/3600} hours</p>
      </div>
      <h3>Description:</h3>
      <p>{props.data.description}</p>
      <Button onClick={() => {setOpen(true)}}>
        Edit
      </Button>
    </div>
  )
}


export default UpdateEventForm;