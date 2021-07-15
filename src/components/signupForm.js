import React, { useState, useEffect } from 'react';
import { Container, TextField, Input, Button } from '@material-ui/core';

const SignupForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleChange = (setStateFunc) => (e) => {
    setStateFunc(e.currentTarget.value);
  }

  const createAccount = (e) => {
    e.preventDefault();
    if (email && password && name) {
      console.log('ACCOUNT SUBMIT');
      console.log('email:', email);
      console.log('password:', password);
      console.log('name:', name);
    } else {
      console.log('FIELD VALIDATION FAILED');
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
      <TextField
        variant="outlined"
        required={true}
        type="name"
        id="name"
        name="name"
        label="Name"
        value={name}
        onChange={handleChange(setName)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={createAccount}
      >
        Create account
      </Button>
    </form>
  );
};

export default SignupForm;
