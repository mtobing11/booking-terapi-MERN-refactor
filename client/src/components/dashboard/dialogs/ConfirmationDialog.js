import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const ConfirmationDialog = ({ dialogOpen, setDialogOpen, handleSubmit, contentArr=[], isLogout=false }) => {
  return (
    <>
        {isLogout ? (
          <Button align='right' onClick={() => { setDialogOpen(true) }}>
            <span style={{ width: '30px' }}><LogoutIcon /></span>
            <Typography>Log out</Typography>
          </Button>
        ) : (
          <Button variant='contained' onClick={() => { setDialogOpen(true) }}>Submit</Button>
        )}
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
          <DialogTitle id='dialog-title'>Are You Sure?</DialogTitle>
          <DialogContent>
            {contentArr.map((content, idx) => (
                <DialogContentText key={`dialog${idx}`}>
                    {content}
                </DialogContentText>
            ))}
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='warning' sx={{ my:'1rem' }} fullWidth onClick={() => setDialogOpen(false)}>No</Button>
            <Button variant='contained' color='primary' sx={{ my:'1rem' }} fullWidth onClick={handleSubmit}>Yes</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default ConfirmationDialog;