import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// import components`
import { Typography, Paper, Button, Tooltip } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';

// import actions
import { handleActiveMenu } from '../../actions/dashboardAct';

// import data
import { links } from '../../data/data';

// Style
const activeLinkStyle = {
  display: 'flex', alignItems: 'center', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '0.75rem',paddingBottom: '0.625rem',
  borderRadius: '0.5rem', color: '#FFF', fontSize: '1rem', lineHeight: '1.5rem' , backgroundColor: '#03C9D7'
}
const normalLinkStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'flexStart', gap: '0.5rem', paddingLeft: '1rem', paddingTop: '0.75rem', paddingBottom: '0.625rem',
  borderRadius: '0.5rem', color: 'rgb(55 65 81)', fontSize: '1rem', lineHeight: '1.5rem', paddingRight: '1rem'
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState(activeLinkStyle);
  const [normalLink, setNormalLink] = useState(normalLinkStyle);
  const [dialogOpen, setDialogOpen] = useState(false);
  const activeMenu = useSelector((state) => state.dashboard.activeMenu);
  const screenSize = useSelector((state) => state.dashboard.screenSize);

  const handleCloseSidebar = () => {
    if(activeMenu && screenSize <= 900){
      dispatch(handleActiveMenu(false))
    }
  }

  const handleSubmit = () => {
    setDialogOpen(false);
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
  }

  return (
    <Paper style={{ height: '100vh', overFlow: 'auto', paddingBottom: '2.5rem' }}>
      {activeMenu && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100%'}}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginLeft: '0.75rem' }}>
              <Link to="/dashboard" onClick={handleCloseSidebar} style={{ fontSize: '1.25rem', lineHeight: '1.75rem', marginLeft: '0.75rem', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <HomeIcon /><span>Home</span>
              </Link>
              <Tooltip title="Menu" placement="bottom">
                <Button sx={{ display: { xs: 'block', sm: 'block', md: 'none' }, py: '0.4rem', px: '0.4rem' }} onClick={handleCloseSidebar}>
                  <CloseIcon />
                </Button>
              </Tooltip>
            </div>
            <Paper sx={{mt: '1.25rem', mx: '0.75rem'}} elevation={0}>
              {links.map((item) => (
                <Paper key={item.title} elevation={0}>
                  <Typography>{item.title}</Typography>
                  {item.links.map((link) => (
                    <NavLink to={`/boardpanel/${link.link}`} key={link.name} onClick={handleCloseSidebar}
                      style = { ({ isActive }) => isActive ? activeLink : normalLink }
                    >
                      <span style={{ width: '30px' }}>{link.icon}</span>
                      <Typography sx={{ textTransform: 'capitalize' }} >{link.name}</Typography>
                    </NavLink>
                  ))}
                </Paper>
              ))}
            </Paper>
          </div>
          <div>
            <ConfirmationDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleSubmit={handleSubmit} contentArr={["Anda ingin logout?"]} 
            isLogout={true} />
            <Typography align="center" variant="body2" sx={{fontSize: '0.7rem'}}>dashboard ver 1.1.1</Typography>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default Sidebar