import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import components
import { Paper, Grid } from '@mui/material';
import Header from '../../components/dashboard/Header';
import DateForm from './DateForm';
import TableForDisplay from '../../components/dashboard/TableForDisplay';

// import functions
import { formattingDate } from '../../utils/utils';

const DateControl = () => {
  const dispatch = useDispatch();
  let id = '638ab34862bf8b925ca25846';
  // const dateForm = {newDate: '2022-12-4', creator: 'react', capacity: 12, shifts: 2, schedules: ['8:00 - 10:00', '11:30 - 14:30'], bookingLimit: 5}
  const tableHeadArr = ['Tanggal', 'Total Shift', 'Jam Operasional', 'Capacity/shift', 'Max/HP', 'Status']
  const [tableContentArr, setTableContentArr] = useState([])
  const dates = useSelector((state) => state.dashboard?.dates);
  
  useEffect(() => {
    if(dates.length >0){
      makeTableContent(dates.length)
    }
  }, [dates])

  const makeTableContent = (arrLength=0) => {
    let arr = []

    for (let i = 0; i < arrLength; i++){
      let currData = dates[i];
      let tempStatus = currData.status ? 'open' : 'closed'; 
      let tempArr = [formattingDate(new Date(currData.openDate), 'dmmy-time'), currData.shifts, currData.schedules.join(' // '), currData.capacity, currData.bookingLimit, tempStatus, currData._id]

      arr.push(tempArr)
    }

    setTableContentArr(arr);
  }
  
  return (
    <Paper elevation={1} sx={{ m: '0.75rem', py: '0.5rem',  px: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Date Control" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <DateForm />
          </Grid>
          <Grid item xs={8}>
            <TableForDisplay headArr={tableHeadArr} contentArr={tableContentArr} dates={dates} needAddMenu={true} />
          </Grid>
        </Grid>
    </Paper>
  )
}

export default DateControl