import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import component
import { Container, Paper, Typography, Avatar, Grid, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputAuth from './InputAuth';

// import actions
import { signin, signup } from '../../actions/userAct';

// functions
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [signForm, setSignForm] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    isSignup ? dispatch(signup(signForm, navigate)) : dispatch(signin(signForm, navigate))
  }

  const handleChange = (e) => {
    setSignForm({ ...signForm, [e.target.name]: e.target.value })
  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)
  const switchMode = () => { setIsSignup((prevIsSignup) => !prevIsSignup) }

  return (
    <Container component='main' maxWidth='xs'>
        <Paper elevation={3} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt:'2rem', p: '0.5rem'}}>
            <Avatar sx={{m: '1rem'}}><LockOpenIcon /></Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '0.75rem' }}>
                <Grid rowSpacing="2" container>
                    {isSignup && (
                        <>
                            <InputAuth name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <InputAuth name="lastName" label="Last Name" handleChange={handleChange}  half />
                        </>
                    )}
                    <InputAuth name="email" label="Email Address" handleChange={handleChange} type="email" />
                    <InputAuth name="password" label="Password" handleChange={handleChange} 
                      type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}
                    />
                    { isSignup && <InputAuth name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Button onClick={switchMode}>
                      { isSignup ? "already have an account? Sign In" : "Don't have an account? Sign Up" }
                    </Button>
                  </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth