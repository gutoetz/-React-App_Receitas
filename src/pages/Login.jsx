import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validInfos, setValidInfos] = useState(false);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validLogin = () => {
      const MAX_NUM = 6;
      const isValidEmail = (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i).test(email);

      setValidInfos(!(isValidEmail && password.length > MAX_NUM));
    };

    validLogin();
  }, [email, password]);

  return (

    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      } }
    >
      <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          data-testid="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
        />
        <FormControlLabel
          sx={ { mx: 12 } }
          control={ <Checkbox value="remember" color="primary" /> }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          data-testid="login-submit-btn"
          disabled={ validInfos }
          sx={ { mt: 3, mb: 2 } }
        >
          Enter
        </Button>
      </Box>
    </Box>

  );
}

export default Login;
