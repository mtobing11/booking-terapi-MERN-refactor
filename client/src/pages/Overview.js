import React from 'react';

// import components
import { Paper, Button } from '@mui/material';

const Overview = () => {

  return (
    <div style={{marginTop: '3rem'}}>
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Paper sx={{ height: '11rem', width: '20rem', borderRadius: '16px', padding: '2rem', margin: '0.7rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>Earning:</p>
              <p>$70.000</p>
            </div>
          </div>
          <div style={{marginTop: '3rem'}}>
            <Button variant="contained" color="primary" sx={{ borderRadius: '10px' }}>Download</Button>
          </div>
        </Paper>
        <Paper sx={{ height: '11rem', width: '20rem', borderRadius: '16px', padding: '2rem', margin: '0.7rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p>Earning:</p>
              <p>$70.000</p>
            </div>
          </div>
          <div style={{marginTop: '3rem'}}>
            <Button variant="contained" color="primary" sx={{ borderRadius: '10px' }}>Download</Button>
          </div>
        </Paper>
      </div>
    </div>
  )
}

export default Overview