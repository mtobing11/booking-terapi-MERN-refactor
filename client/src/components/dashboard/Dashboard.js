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
  const activeMenu = useSelector((state) => state.dashboard.activeMenu)

  useEffect(() => {
    dispatch(getAllDates());
  }, [])
  return (
    <div style={{ position: 'relative', display: 'flex', backgroundColor: 'rgb(248 250 252)'}}>
      {activeMenu ? (
        <div style={{ position: 'fixed', width: '250px' }}>
          <Sidebar />
        </div>
      ) : (
        <div>
          <Sidebar  style={{ position: 'fixed', width: '0px' }}/>
        </div>
      )}
      <div style={{ marginLeft: activeMenu ? '250px' : '0px', marginRigth: '1rem', width: '100%' }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard