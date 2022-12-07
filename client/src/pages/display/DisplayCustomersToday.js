import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// import components
import { Paper, Box, Button, Typography } from '@mui/material';
import Header from '../../components/dashboard/Header';
import TableForDisplay from '../../components/dashboard/TableForDisplay';

// import functions
import { findDate, makeNewArrObject } from '../../utils/utils'

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

const DisplayCustomersToday = () => {
  const headArr = ['Date', 'Nama', 'No HP', 'Shift', 'No Urut', 'booked at'];
  const activeLink = activeLinkStyle;
  const normalLink = normalLinkStyle;
  const [tableContentArr, setTableContentArr] = useState([])
  const [activeTab, setActiveTab] = useState(0);
  const [isDataToday, setIsDataToday] = useState(false);
  const dates = useSelector((state) => state.dashboard?.dates)

  useEffect(() => {
    if(dates.length > 0){
      let dateData = findDate(dates, true)
      if(dateData.length > 0){
        let tempArr = arrangeArr(dateData[0])
        setIsDataToday(true)
        setTableContentArr(tempArr)
      }
      else {
        setIsDataToday(false)
      }
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

  return (
    <Paper elevation={1} sx={{ m: '0.75rem', p: '1.5rem', borderRadius: '1.5rem' }}>
        <Header category="Page" title="Customer Hari Ini" />
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
          {/* <Box style={activeLink}>
            <Button title="shift1" value={0} onClick={(e) => { handleActiveButton(e) }}>Shift1</Button>
          </Box>
          <Box style={normalLink}>
            <Button title="shift2" value={1} onClick={(e) => { handleActiveButton(e) }}>Shift2</Button>
          </Box> */}
        </div>
        <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 191, 255, 0.3)' }}>
          {isDataToday ? (
            <TableForDisplay headArr={headArr} contentArr={tableContentArr[activeTab]} />
          ) : (<Typography>No Customers Today</Typography>)}
        </div>
    </Paper>
  )
}

export default DisplayCustomersToday