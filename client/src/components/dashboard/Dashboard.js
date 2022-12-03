import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import decode from 'jwt-decode';

// import components
import Sidebar from './Sidebar';
import Navbar from './Navbar';

// import actions
import { getAllDates } from '../../actions/dashboardAct';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDates());
  }, [])
  return (
    <div>
      <Sidebar />
      <div>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard