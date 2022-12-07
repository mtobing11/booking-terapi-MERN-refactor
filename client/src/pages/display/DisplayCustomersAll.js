import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// import components
import { Paper, Box, Button, Typography, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../../components/dashboard/Header';
import TableForDisplay from '../../components/dashboard/TableForDisplay';

// import functions
import { findDate, findDateIndex, makeNewArrObject, formattingDate } from '../../utils/utils'

// Style
const activeLinkStyle = {
  display: 'flex', alignItems: 'center', paddingLeft: '1rem', paddingRight: '0.75rem', paddingTop: '1rem', paddingBottom: '0.625rem',
  color: 'rgb(55 65 81)', fontSize: '1rem', lineHeight: '1.5rem', backgroundColor: 'rgba(0, 191, 255, 0.3)', 
  borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', borderBottomRightRadius: '0', borderBottomLeftRadius: '0'
}
const normalLinkStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'flexStart', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '0.75rem', paddingBottom: '0.625rem',
  borderTopLeftRadius: '16px', borderTopRightRadius: '16px', color: 'rgb(55 65 81)', fontSize: '1rem', lineHeight: '1.5rem', paddingRight: '1rem',
  border: '2px solid #fff', backgroundColor: '#CECECE'
}

const DisplayCustomersAll = () => {
  const headArr = ['Date', 'Nama', 'No HP', 'Shift', 'No Urut', 'booked at'];
  const numInArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const activeLink = activeLinkStyle;
  const normalLink = normalLinkStyle;
  const [tableContentArr, setTableContentArr] = useState([])
  const [activeTab, setActiveTab] = useState(0);
  const [isDataAll, setIsDataAll] = useState(false);
  const [dateArrToShow, setDateArrToShow] = useState([]);
  const [dateIndex, setDateIndex] = useState(-1);
  const dates = useSelector((state) => state.dashboard?.dates)

  useEffect(() => {
    if(dates.length > 0){
      let dateNow = new Date();
      dateNow.setDate(dateNow.getDate() + 1);

      let dateData = findDate(dates, false)
      let tempArr, dateIndex;
      
      if(dateData.length > 0){
        tempArr = arrangeArr(dateData[0])
        dateIndex = findDateIndex(new Date(dateData[0].openDate), dates)
      } else {
        let datesLength = dates.length;
        console.log(datesLength);
        dateIndex = datesLength - 1
        tempArr = arrangeArr(dates[dateIndex])
      }

      setIsDataAll(true)
      setTableContentArr(tempArr)
      setDateIndex(dateIndex)

      let dateArr = dates.map((date) => formattingDate(new Date(date.openDate), 'dmmy-time'))
      setDateArrToShow(dateArr)
    } else {
      setIsDataAll(false)
    }
  }, [dates])

  const arrangeArr = (obj) => {
    let resultArr = [];
    let shiftLength = obj.shifts > 3 ? 3 : obj.shifts;
    
    for (let i = 0; i < shiftLength; i++){
      let currShift = `customersShift${i+1}`;
      let tempArr = makeNewArrObject(obj[currShift], ['name', 'cellphone', 'bookedAt'], obj.openDate,`shift${i+1}`);

      resultArr.push(tempArr)
    }
    return resultArr
  }

  const handleActiveButton = (e) => {
    let index = e.target.value
    setActiveTab(index)
  }
  const handleDateChange = (e) => {
    let index = e.target.value;
    setDateIndex(index);

    let tempArr = arrangeArr(dates[index]);
    setTableContentArr(tempArr);
  }

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Customer Tanggal:" />
        <Box sx={{ width: 1, mb: '1rem' }}>
          <FormControl fullWidth>
            <InputLabel id='datesSelection'>Tanggal</InputLabel>
            {dateIndex > -1 && (
              <Select labelId='datesSelection' name='datesSelection' id='datesSelectionId' label='pilih tanggal'
                value={dateIndex} onChange={(e) => handleDateChange(e)} defaultValue=""
              >
                {dateArrToShow.map((date, idx) => (
                  <MenuItem key={`choice-${idx}`} value={idx}>{date}</MenuItem>
                ))} 
              </Select>
            )}
          </FormControl>
        </Box>
        <div style={{ display: 'flex'}}>
          {tableContentArr.map((content, idx) => (
            <Box key={`tab-${idx}`}>
              {idx == activeTab ? (
                <Button title={`shift${idx+1}`} value={idx} onClick={(e) => { handleActiveButton(e) }} style={activeLink}>Shift {idx+1}</Button>
              ) : (
                <Button title={`shift${idx+1}`} value={idx} onClick={(e) => { handleActiveButton(e) }} style={normalLink}>Shift {idx+1}</Button>
              )}
            </Box>
          ))}
        </div>
        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 191, 255, 0.3)' }}>
          {isDataAll ? (
            <TableForDisplay headArr={headArr} contentArr={tableContentArr[activeTab]} />
          ) : (<Typography>No Customers Today</Typography>)}
        </div>
    </Paper>
  )
}

export default DisplayCustomersAll