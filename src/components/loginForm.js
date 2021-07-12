import { useState, useEffect } from 'react';
import { Container, TextField, Input, Button } from '@material-ui/core';

const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (setStateFunc) => (e) => {
    setStateFunc(e.currentTarget.value);
  }

  const submitLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('LOGIN SUBMIT');
      console.log('email:', email);
      console.log('password:', password);
    } else {
      console.log('LOGIN VALIDATION FAILED');
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
