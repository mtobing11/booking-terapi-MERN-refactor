import React from 'react';

//import components
import { Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { themeCustom, CustomBox } from './styles';

const HeadText = () => {
  return (
    <div>
        <CustomBox>
          <ThemeProvider theme={themeCustom}>
            <Typography variant="h1" align="center">TERAPI KETOK</Typography>
            <Typography variant="h2" align="center" sx={{ marginTop: '0.5rem', marginBottom: '2rem' }}> Mr. Kevin</Typography>
            <Typography variant="body1" align="center">Ruko Grand Galaxy</Typography>
            <Typography variant="body1" align="center">Jl. Rose Garden 3</Typography>
            <Typography variant="body1" align="center">RRG 3 no: 67</Typography>
            <Typography variant="body1" align="center">Jakasetia</Typography>
            <Typography variant="body1" align="center">Bekasi Selatan</Typography>
          </ThemeProvider>
        </CustomBox>
    </div>
  )
}

export default HeadText