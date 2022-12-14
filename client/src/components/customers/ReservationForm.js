import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import components
import { TextField, Box, InputLabel, MenuItem, FormControl, Select, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

// import actions
import { getAvailableDates, makeReservation } from '../../actions/reservationAct';

// import functions
import { phoneValidator } from '../../utils/utils';
const initialSetup = { name: '', cellphone: '', shift: 0, openDate: '' }

const ReservationForm = () => {
  const dispatch = useDispatch();
  const [bookForm, setBookForm] = useState(initialSetup);
  const [shiftArr, setShiftArr] = useState([]);
  const [dateId, setDateId] = useState('');
  const dates = useSelector((state) => state.reservation?.dates)
  
  useEffect(() => {
    dispatch(getAvailableDates())
  }, [])

  useEffect(() => {
    if(dates.length > 0){
      let shiftLength = dates[0].shifts > 3 ? 3 : dates[0].shifts;
      let tempShiftArr = [];

      setBookForm({ ...bookForm, openDate: dates[0].openDate, shift: 1 })

      for(let i = 0; i < shiftLength; i++){
        tempShiftArr.push(`shift${i+1}`)
      }
      setDateId(dates[0]._id)
      setShiftArr(tempShiftArr);
    }
  }, [dates])

  const handleSubmit = (e) => {
      e.preventDefault();
      const formattedPhone = phoneValidator(bookForm.cellphone)
      dispatch(makeReservation({ ...bookForm, cellphone: formattedPhone }, dateId))
      // clear();
  }

  const handleDateChange = (val) => {
    setBookForm({...bookForm, openDate: val})
  }

  const handleShiftChange = (e) => {
    setBookForm({ ...bookForm, shift: e.target.value })
  }

  const clear = () => {
    setBookForm({ ...initialSetup, openDate: dates[0].openDate, shift: 1 })
  }

  return (
    <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '5px' }}>
      <form autoComplete='off' noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', height: 250 }}>
        <TextField name="name" label="Nama" variant="outlined" required={true} size="small"
            fullWidth value={bookForm.name} onChange={(e)=> setBookForm({ ...bookForm, name: e.target.value })} 
        />
        <TextField name="cellphone" variant="outlined" required={true}  size="small"
            fullWidth label="No Hp" value={bookForm.cellphone} onChange={(e)=>setBookForm({ ...bookForm, cellphone: e.target.value })} 
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <MobileDatePicker label="Date" name="openDate" inputFormat="DD/MMM/YYYY dddd" value={bookForm.openDate}
                onChange={handleDateChange} renderInput={(params) => <TextField {...params} required={true} size="small" fullWidth />} disabled={true}
            />
        </LocalizationProvider>
        <Box sx={{ width: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="shiftName" size="small">Jam Kunjungan</InputLabel>
            {shiftArr.length > 0 && (
              <Select labelId="shiftName" name="shiftName" id="shiftNameId" required={true}  size="small"
                  value={bookForm.shift} label="Pilih jam kunjungan" onChange={(e)=>handleShiftChange(e)}
              >
                {shiftArr.map((shift, idx) => (
                  <MenuItem key={`${idx}-${shift}`} value={idx+1}>{dates[0].schedules[idx]}</MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Box>
        <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
      </form>
    </div>
  )
}

export default ReservationForm;