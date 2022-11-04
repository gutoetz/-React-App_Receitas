import { Typography } from '@mui/material';
import React from 'react';

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" { ...props }>
      Develop by
      André, Augusto, Cauê, Gabriel e Matheus
      <br />
      Copyright ©
      {' '}
      {new Date().getFullYear()}
    </Typography>
  );
}
