import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import actions
import { openNewDate, updateDate, deleteDate } from '../../actions/dashboardAct';

const DateControl = () => {
  const dispatch = useDispatch();
  let id = '638ab34862bf8b925ca25846'
  
  const dateForm = {newDate: '2022-12-4', creator: 'react', capacity: 12, shifts: 2, schedules: ['8:00 - 10:00', '11:30 - 14:30'], bookingLimit: 5}

  const handleOpenNewDate = () => {
    dispatch(openNewDate(dateForm))
  }

  const handleUpdateDate = () => {
    dispatch(updateDate({ ...dateForm, capacity: 30 }, id))
  }

  const handleDeleteDate = () => {
    dispatch(deleteDate(id))
  }
  
  return (
    <div>
        <h1>Date Control</h1>
        <button onClick={handleOpenNewDate}>New Date</button>
        <button onClick={handleUpdateDate}>Update Date</button>
        <button onClick={handleDeleteDate}>Delete Date</button>
    </div>
  )
}

export default DateControl