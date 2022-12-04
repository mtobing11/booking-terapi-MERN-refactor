import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// import decode from 'jwt-decode';

// import components
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessageSnackbar from '../../components/dashboard/MessageSnackbar';

// import actions
import { getAllDates, getSetup } from '../../actions/dashboardAct';

const Dashboard = () => {
  const setupID = '6389fb5de854b4cbe464673e';
  const dispatch = useDispatch();
  const [isAlert, setIsAlert] = useState(false);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);
  const errorResponse = useSelector((state) => state.dashboard?.error);

  useEffect(() => {
    dispatch(getAllDates());
    dispatch(getSetup(setupID));
  }, [])

  useEffect(() => {
    if(errorResponse){
      setIsAlert(true)
    }
  }, [errorResponse])
  
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
        <MessageSnackbar isAlert={isAlert} setIsAlert={setIsAlert} message={errorResponse} />
      </div>
    </div>
  )
}

export default Dashboard