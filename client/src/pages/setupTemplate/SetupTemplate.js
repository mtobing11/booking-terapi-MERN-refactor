import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import components
import { Paper, TextField, Button } from '@mui/material';
import Header from '../../components/dashboard/Header';

// import actions
import { updateSetupTemplate } from '../../actions/dashboardAct';

// functions
const initialSetup = { capacity: 0, bookingLimit: 0, shifts: 0, schedules: [] }

const SetupTemplate = () => {
  const setupID = '6399a5b194f10be27c2aa767';
  const user = 'Visual Man';
  const shiftsNameArr = ['shift1', 'shift2', 'shift3'];
  const dispatch = useDispatch();
  const [setupForm, setSetupForm] = useState(initialSetup);
  const [isForm, setIsForm] = useState(false);
  const setupData = useSelector((state) => state.dashboard?.setup)

  useEffect(() => {
    if(setupData){
        setSetupForm({...setupData, creator: user })
        setIsForm(true)
    }
  }, [setupData])

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(updateSetupTemplate(setupForm, setupID))
  }

  const handleChange = (e, idx) => {
    let tempArr = [...setupForm.schedules];
    
    tempArr[idx] = e.target.value;
    setSetupForm({...setupForm, schedules: tempArr})
  }

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', py: '0.5rem',  px: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Setup Template for Input" />
        <Paper sx={{ m: '1rem', p: '1rem', pb: '0.5rem' }} elevation={6}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '40vw'}}>
                <TextField name="capacity" label="Capacity / shift" type="number" value={setupForm.capacity} required={true} size="small"
                    onChange={(e)=> setSetupForm({ ...setupForm, capacity: e.target.value })} InputLabelProps={{ shrink: true, }} 
                    sx={{ mt: '1rem', mb: '0.5rem', width: '100%' }}
                />
                <TextField name="bookingLimit" label="Booking Limit / HP" type="number" value={setupForm.bookingLimit} required={true} size="small"
                    onChange={(e)=> setSetupForm({ ...setupForm, bookingLimit: e.target.value })} InputLabelProps={{ shrink: true, }} 
                    sx={{ my: '0.5rem', width: '100%' }}
                />
                <TextField name="shifts" label="Jumlah Shift" type="number" value={setupForm.shifts} required={true} size="small"
                    onChange={(e)=> setSetupForm({ ...setupForm, shifts: e.target.value })} InputLabelProps={{ shrink: true, }} 
                    sx={{ my: '0.5rem', width: '100%' }}
                />
                {isForm && (
                    <div style={{display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                        {shiftsNameArr.map((shiftName, idx) => (
                            <TextField key={`shift-${idx}`} name={shiftName} label={`Schedule Shift ${idx}`} type="string" value={setupForm.schedules[idx]} required={true} size="small"
                                onChange={(e) => handleChange(e, idx)}
                                InputLabelProps={{ shrink: true, }} sx={{ my: '0.5rem', width: '100%' }}
                            />
                        ))}
                    </div>
                )}
                <Button variant="contained" color="primary" size="large" type="submit" sx={{ my: '1rem' }} fullWidth>Submit</Button>
            </form>
        </Paper>
    </Paper>
  )
}

export default SetupTemplate