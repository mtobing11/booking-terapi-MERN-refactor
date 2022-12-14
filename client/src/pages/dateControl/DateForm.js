import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

// import components
import { Paper, Typography, TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import ConfirmationDialog from '../../components/dashboard/dialogs/ConfirmationDialog';
// import MessageSnackbar from '../../components/dashboard/MessageSnackbar';

// import actions
import { openNewDate, updateDate } from '../../actions/dashboardAct';

// functions
import { formattingDate, setupShitsStatus, cutArray } from '../../utils/utils';
const initialSetup = { status: true, capacity: 0, bookingLimit: 1, shifts: 0, schedules: [], shiftsStatus: []}

const DateForm = () => {
  const maxShift = 3;
  const editRef = useRef();
  const contentRef = useRef();
  const dispatch = useDispatch();
  const [dateForm, setDateForm] = useState(initialSetup);
  const [shiftArr, setShiftArr] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const setup = useSelector((state) => state.dashboard?.setup)
  const editDateID = useSelector((state) => state.dashboard?.editDateID);
  const editDateData = useSelector((state) => state.dashboard?.editDateData);

  
  useEffect(() => {
    setupDataFormSetup()
  }, [setup])

  useEffect(() => {
    if(editDateData){
      console.log(editDateData);
      let shiftsSchedule = editDateData.schedules.map((shift) => shift.schedule);
      // let shiftsQuota = currData.schedules.map(shift => shift.quota);

      setDateForm({...editDateData, capacity: editDateData.schedules[0].quota, schedules: shiftsSchedule })
      editRef.current.focus()
      // console.log(editDateID)
    }
  }, [editDateData])

  useEffect(() => {
    let tempArr = [];
    for(let i = 0; i < dateForm.shifts; i++){ tempArr.push(`shift${i+1}`)}
    setShiftArr(tempArr)

    let shiftsStatus = setupShitsStatus(dateForm.shifts, maxShift);
    setDateForm({ ...dateForm, shiftsStatus})
  }, [dateForm.shifts])

  useEffect(() => {
    contentRef.current = [
      `tanggal: ${formattingDate(new Date(dateForm.openDate), 'dmmy-time')}`, `total shift: ${dateForm.shifts}`, 
      `jam: ${cutArray(dateForm.schedules, dateForm.shifts)}`, `kapasitas / shift: ${dateForm.capacity}`, `max booking / HP: ${dateForm.bookingLimit}`
    ]
  }, [dateForm])

  useEffect(() => {
    setupDataFormSetup()
  }, [])

  const handleSubmit = () => {
    setDialogOpen(false);
    if(editDateID){dispatch(updateDate(dateForm, editDateID, true))}
    else {dispatch(openNewDate(dateForm))}
    setupDataFormSetup()
  }

  const handleDateChange = (val) => {
    setDateForm({...dateForm, openDate: val})
  }

  const handleScheduleChange = (e, idx) => {
    let tempArr = [...dateForm.schedules];
    tempArr[idx] = e.target.value;
    
    setDateForm({ ...dateForm, schedules: tempArr });
  }

  const setupDataFormSetup = () => {
    let dateNow = new Date();
    dateNow.setDate(dateNow.getDate() + 1);
    if(setup){
      let shiftsStatus = setupShitsStatus(setup.shifts, maxShift);
      setDateForm({...setup, openDate: moment(new Date(dateNow)), shiftsStatus: shiftsStatus, status: true});
    }
  }


  return (
    <Paper sx={{ p: '1rem', pb: '0.5rem' }} elevation={2}>
        <Box sx={{ backgroundColor: editDateID ? '#ffc107' : '#fff'}}>
            <Typography variant="h6" sx={{m: '1rem', mt: '0' }} elevation={6}>{editDateID ? "Edit Date" : "Open New Date"}</Typography>
        </Box>
        <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', minWidth: '10vw'}}>
            <LocalizationProvider dateAdapter={AdapterMoment} fullWidth>
                <MobileDatePicker label="Date" name="openDate" inputFormat="DD/MMM/YYYY dddd" value={dateForm.openDate}
                    onChange={handleDateChange} renderInput={(params) => <TextField {...params} required={true} size="small" />}  disabled={editDateID ? true : false }
                />
            </LocalizationProvider>
            <TextField name="shifts" label="Jumlah Shift" type="number" min={1} max={3} value={dateForm.shifts} required={true} size="small"
                InputLabelProps={{ shrink: true, }}  sx={{ my: '1rem' }} autoFocus={true} inputRef={editRef}
                onChange={ (e)=> setDateForm({ ...dateForm, shifts: e.target.value > 3 ? 3 : e.target.value }) } 
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {shiftArr.map((shift, idx) => idx < 3 ? (
                <TextField name={`${shift}Cap`} label={`Jam ${shift}`} type="string" size="small" value={dateForm.schedules[idx]}
                    onChange={(e)=> handleScheduleChange(e, idx)} InputLabelProps={{ shrink: true }} key={`shiftTable${idx}`}
                />
              ) : null)}
            </div>
            <TextField
                  name="capacity" label="Kapasitas / shift" type="number" value={dateForm.capacity} required={true} size="small"
                  InputLabelProps={{ shrink: true }} onChange={(e)=> setDateForm({ ...dateForm, capacity: e.target.value })} 
                  sx={{ mt: '1rem', width: '100%' }}
            />
            <TextField name="bookingLimit" label="Max booking per no HP" type="number" value={dateForm.bookingLimit} required={true} size="small"
                  onChange={(e)=> setDateForm({ ...dateForm, bookingLimit: e.target.value })} InputLabelProps={{ shrink: true, }} 
                  sx={{ my: '1rem', width: '100%' }}
            />
            <Box sx={{ width: 1, maxWidth: '200px', mb: '1rem' }}>
                <FormControl fullWidth>
                    <InputLabel id="status" size="small">Open / Close</InputLabel>
                    <Select
                        labelId="status" name="status" id="statusId" required={true} size="small"
                        value={dateForm.status} label="Open / Close" onChange={(e)=>setDateForm({ ...dateForm, status: e.target.value })}
                    >
                    <MenuItem value={true}>Open Date</MenuItem>
                    <MenuItem value={false}>Close Date</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </form>
        <ConfirmationDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleSubmit={handleSubmit} contentArr={contentRef.current}/>
    </Paper>
  )
}

export default DateForm