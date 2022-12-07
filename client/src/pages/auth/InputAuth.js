import React from 'react';
import { TextField, Grid } from '@mui/material';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField name={name} onChange={handleChange} variant="outlined" size="small" required
            fullWidth label={label} autoFocus={autoFocus} type={type}
        />
    </Grid>
  )
}

export default Input