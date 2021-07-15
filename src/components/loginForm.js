import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Input, Button } from '@material-ui/core';
import { useRouter } from 'next/router'
import axios from 'axios';
import Account from '../accountContext';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { update }= useContext(Account);

  console.log(update);

  const handleChange = (setStateFunc) => (e) => {
    setStateFunc(e.currentTarget.value);
  }

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      axios.post('/login', { email, password })
        .then((data) => {
          if (data.status === 200) {
            update();
            router.push('/home');
          } else {
            console.log('ERROR TOOLTIP WITH:', data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // TODO: logic for when login input is invalid
    }
  }

  return (
    <form noValidate autoComplete="off" >
      <TextField
        variant="outlined"
        autoFocus={true}
        required={true}
        type="email"
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={handleChange(setEmail)}
      />
      <TextField
        variant="outlined"
        required={true}
        type="password"
        id="password"
        name="password"
        label="Password"
        value={password}
        onChange={handleChange(setPassword)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={submitLogin}
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
