import React from 'react';
import { Typography } from '@mui/material';

const Header = ({ category, title }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
        <Typography variant="h6" sx={{ color: 'rgb(156 163 175)' }}>{category}</Typography>
        <Typography variant="h4">{title}</Typography>
    </div>
  )
}

export default Header