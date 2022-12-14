import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import component
import { Grow, Container, Grid, CardMedia, Paper, Avatar, Link } from '@mui/material';
import ReservationForm from './ReservationForm';
import whatsAppImg from '../../data/WhatsApp.png';
import image from '../../data/tketok_2.svg';

const Home = () => {
  const whatsappLink = "https://api.whatsapp.com/send?phone=6281299098724&amp;text=Halo%20Terapi%20Ketok%20Mr.Kevin%20";
  const openingMessageID = '63736bef3dda6cf66d20d536';

  return (
    <Grow in>
      <CardMedia image={image}>
        <Container maxWidth="sm" sx={{padding: 2, position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Link href={whatsappLink} target="_blank" rel="noopener">
              <Avatar src={whatsAppImg} variant='square' sx={{ position: 'absolute', right: '0', bottom: '35%', zIndex: 100, width:'60px', height: '60px' }} />
          </Link>
          <ReservationForm />
        </Container>
      </CardMedia>
    </Grow>
  )
}

export default Home