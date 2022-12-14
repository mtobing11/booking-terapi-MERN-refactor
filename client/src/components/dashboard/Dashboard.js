import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

// import components
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MessageSnackbar from '../../components/dashboard/MessageSnackbar';

// import actions
import { getAllDates, getSetup, getOpeningMessage } from '../../actions/dashboardAct';

const Dashboard = () => {
  const setupID = '6399a5b194f10be27c2aa767';
  const messageID = '6399a64319f6e07e02575324';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [isAlert, setIsAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);
  const errorResponse = useSelector((state) => state.dashboard?.error);
  const successResponse = useSelector((state) => state.dashboard?.success);

  useEffect(() => {
    if(!user){
      console.log('logout automatically');
      navigate('/auth');
    }
    if(user){
      dispatch(getAllDates());
      dispatch(getSetup(setupID));
      dispatch(getOpeningMessage(messageID));
    }
    
  }, [])

  useEffect(() => {
      const token = user?.token;
      if(token) {
          const decodedToken = decode(token);
          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
      }

      setUser(JSON.parse(localStorage.getItem('profile')))

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    if(errorResponse){
      console.log(errorResponse.data);
      setResMessage(errorResponse.data.message)
      setIsAlert(true)
    }

    if(successResponse){
      setResMessage(successResponse)
      setIsSuccess(true)
    }
  }, [errorResponse, successResponse])

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null)
  }
  
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
        <MessageSnackbar isAlert={isAlert} setIsAlert={setIsAlert} messageRes={resMessage} type='warning' />
        <MessageSnackbar isAlert={isSuccess} setIsAlert={setIsSuccess} messageRes={resMessage} type='success' />
      </div>
    </div>
  )
}

export default Dashboard