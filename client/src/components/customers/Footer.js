import React from 'react';

import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themeCustom } from './styles';

const Footer = () => {
  return (
    <div style={{ marginTop: '20px' }}>
      <ThemeProvider theme={themeCustom}>
        <Typography variant="body2" align="center">digitalmartinhouse.com</Typography>
        <Typography variant="body2" align="center">ver 2.1.0</Typography>
      </ThemeProvider>
    </div>
  )
}

export default Footer