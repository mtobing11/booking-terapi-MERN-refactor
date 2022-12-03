import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import components
import { Tooltip, Avatar, Typography } from '@mui/material';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
// import avatar from '../../data/rhs_02.jpeg';

// import actions
import { handleActiveMenu, handleResizeScreen } from '../../actions/dashboardAct';

// additional component
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip title={title} placement="bottom">
    <button type="button" onClick={() => customFunc()} style={{ color, position: 'relative', fontSize: '1.25rem', padding: '0.75rem', borderRadius: '50%', border: '0', backgroundColor: 'rgb(248 250 252)' }}>
      <span style={{ background: dotColor, position: 'absolute', display: 'inline-flex', borderRadius: '50%', height: '0.5rem', width: '0.5rem', right: '0.5rem', top: '0.5rem' }} />
        {icon}
    </button> 
  </Tooltip>
)

const Navbar = () => {
  const dispatch = useDispatch();
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const activeMenu = useSelector((state) => state.dashboard.activeMenu)

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth)
      dispatch(handleResizeScreen(screenSize))
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if(screenSize <= 900){
      dispatch(handleActiveMenu(false))
    } else {
      dispatch(handleActiveMenu(true))
    }
  }, [screenSize])

  const handleMenu = () => {dispatch(handleActiveMenu(!activeMenu))}

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', padding: '0.5rem', marginLeft: '1.5rem', marginRight: '1.5rem', minWidth: '90%' }}>
      <NavButton title="Menu" customFunc={handleMenu} color="#03C9D" icon={<ViewWeekIcon />} />
      <div style={{ display: 'flex' }}>
        <Tooltip title='Profile' placement='bottom'>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem', borderRadius: '0.5rem' }}>
            <Avatar />
            <div style={{ display: 'flex' }}>
              <Typography sx={{mr: '0.25rem'}} variant="body2" align="center">Hi</Typography>
              <Typography variant="body2" align="center">Martin</Typography>
              {/* <Typography variant="body2" align="center">{user?.userData?.name}</Typography> */}
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Navbar