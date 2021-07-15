import styles from '../styles/create-event.module.css';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles, TextField } from '@material-ui/core/styles';
import Paper from '@material-ui/core/styles';
import Button from '@material-ui/core/styles';

import Head from 'next/head';
import Image from 'next/image';

const sampleImg = 'https://wallpaperaccess.com/full/632782.jpg';

const useStyles = makeStyles({
  button: {
    width: '100%',
    margin: '10px 0 5px 0',
    '&:hover': {
      color: 'white',
      background: '#98609c'
    }
  },
})

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  const { register, handleSubmit } = useForm({
    revalidateMode: 'onSubmit',
    shouldUseNativeValidation: true
  });

  return (
    <div className={styles.window}>
      <div className={styles.container}>
        <Image
            src={sampleImg}
            className={styles.photo}
            layout="responsive"
            height={144}
            width={1050}
            alt="event-image"
          />


      </div>
    </div>
  )
}

export default CreateEvent;
