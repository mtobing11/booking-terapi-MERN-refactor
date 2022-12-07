import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const ModifyDialog = ({ dialogOpen, setDialogOpen, handleSubmit, textContent }) => {
  return (
    <>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
          <DialogTitle id='dialog-title'>Are You Sure?</DialogTitle>
          <DialogContent>
                <DialogContentText>
                    {textContent}
                </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='warning' sx={{ my:'1rem' }} fullWidth onClick={() => setDialogOpen(false)}>No</Button>
            <Button variant='contained' color='primary' sx={{ my:'1rem' }} fullWidth onClick={handleSubmit}>Yes</Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default ModifyDialog