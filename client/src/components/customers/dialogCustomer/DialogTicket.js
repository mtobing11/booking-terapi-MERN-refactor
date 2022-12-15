import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const DialogTicket = ({ dialogOpen=false, setDialogOpen, handleClickButton, title, contentArr=[], footer, dialogStyle }) => {

  return (
    <>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby='dialog-title' aria-describedby='dialog-description' sx={dialogStyle}>
          <DialogTitle id='dialog-title'>{title}</DialogTitle>
          <DialogContent>
            {contentArr.map((content, idx) => (
                <DialogContentText key={`dialog${idx}`}>
                    {content}
                </DialogContentText>
            ))}
            <DialogContentText style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
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