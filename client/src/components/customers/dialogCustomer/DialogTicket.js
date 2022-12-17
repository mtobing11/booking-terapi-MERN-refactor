import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const DialogTicket = ({ dialogOpen=false, setDialogOpen, handleClickButton, title, contentArr=[], footer, dialogStyle, icon }) => {

  return (
    <>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description' sx={dialogStyle}>
          <DialogTitle id='dialog-title' sx={{ fontSize: '2rem' }}>{title}</DialogTitle>
          <span style={{ width: '100px', marginLeft: 'auto', marginRight: 'auto' }}>{icon}</span>
          <DialogContent>
            {contentArr.map((content, idx) => (
                <DialogContentText key={`dialog${idx}`} style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                    {content}
                </DialogContentText>
            ))}
            <DialogContentText style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
                {footer}
            </DialogContentText>
          </DialogContent>
          {/* <DialogActions>
            <Button variant='contained' color='primary' sx={{ mb:'1rem' }} fullWidth onClick={handleClickButton}>Close</Button>
          </DialogActions> */}
        </Dialog>
    </>
  )
}

export default DialogTicket