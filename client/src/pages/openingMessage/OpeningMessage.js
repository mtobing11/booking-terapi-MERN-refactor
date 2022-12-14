import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components
import { Paper, TextField, Button, TextareaAutosize, Box, InputLabel, MenuItem, FormControl, Select, } from '@mui/material';
import Header from '../../components/dashboard/Header';

// import actions
import { updateOpeningMessage } from '../../actions/dashboardAct';

// functions
const initialSetup = { message: '', duration: 0, isDuration: true, status: false, creator: ''}

const OpeningMessage = () => {
  const messageID = '6399a64319f6e07e02575324'
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const [messageForm, setMessageForm] = useState(initialSetup);
  const messageData = useSelector((state) => state.dashboard?.message)

  useEffect(() => {
    if(messageData){
        setMessageForm({...messageData, creator: user })
    }
  }, [messageData])

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateOpeningMessage(messageForm, messageID))
  }

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', py: '0.5rem',  px: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Opening Message Control" />
        <Paper sx={{ m: '1rem', p: '1rem', pb: '0.5rem' }} elevation={6}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
                <TextareaAutosize  minRows={4} maxRows={8} name="message" label="Message to display" type="string" value={messageForm.message}
                    sx={{ my: '1rem' }} required={true} style={{ fontSize: 20, padding: 10}}
                    onChange={(e)=> setMessageForm({ ...messageForm, message: e.target.value })}
                />
                <TextField name="duration" label="Durasi (detik)" type="number" value={messageForm.duration} required={true} size="small"
                    InputLabelProps={{ shrink: true, }}  sx={{ my: '1rem', maxWidth: '200px'}}
                    onChange={ (e)=> setMessageForm({ ...messageForm, duration: e.target.value }) } 
                />
                <Box sx={{ width: 1, maxWidth: '200px', mb: '1rem' }}>
                    <FormControl fullWidth>
                        <InputLabel id="messageStatus" size="small">Open / Close Message?</InputLabel>
                        <Select
                            labelId="messageStatus" name="messageStatus" id="messageStatusId" required={true} size="small"
                            value={messageForm.status} label="Pilih jam kunjungan" onChange={(e)=>setMessageForm({ ...messageForm, status: e.target.value })}
                        >
                        <MenuItem value={true}>Open Message</MenuItem>
                        <MenuItem value={false}>Close Message</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
            </form>
        </Paper>
    </Paper>
  )
}

export default OpeningMessage;