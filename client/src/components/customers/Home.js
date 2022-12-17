import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import component
import { Grow, Container, Link, Grid, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import ReservationForm from './ReservationForm';
import Footer from './Footer';
import TicketDialog from './dialogCustomer/DialogTicket';
import MessageSnackbar from '../dashboard/MessageSnackbar';
import whatsAppImg from '../../data/WhatsApp.png';
import HeadText from './HeadText';
import { ResponsiveBGGrid, ResponsiveTitleGrid, ResponsiveAvatar, ResponsiveBox } from './styles';

// import actions
import { getAvailableDates, getOpeningMessage } from '../../actions/reservationAct';
import { RESET_CUSTOMER } from '../../constants/actionTypes';

// import functions
import { formattingDate } from '../../utils/utils'

const messageObj = {
  ticket: { title: 'Booking berhasil', footer: 'Harap screen capture ticket ini', bgColor: {}, icon: <CheckCircleOutlineIcon color="success" style={{ fontSize: "100px" }} /> },
  infoFull: { title: 'Info', footer: '',  bgColor: {backgroundColor: ''}, icon: '' },
  message: { title: '', footer: '',  bgColor: {backgroundColor: ''}, icon: '' },
}

const Home = () => {
  const dispatch = useDispatch();
  const ticketRef = useRef();
  const titleRef = useRef();
  const footerRef = useRef();
  const styleRef = useRef();
  const iconRef = useRef();
  const whatsappLink = "https://api.whatsapp.com/send?phone=6281299098724&amp;text=Halo%20Terapi%20Ketok%20Mr.Kevin%20";
  const openingMessageID = '6399a64319f6e07e02575324';
  const [isAlert, setIsAlert] = useState(false);
  const [resMessage, setResMessage] = useState('');
  const [ticketDialogOpen, setTicketDialogOpen] = useState(false);
  const ticket = useSelector((state) => state.reservation?.ticket);
  const ticketInfoFull = useSelector((state) => state.reservation?.ticketInfo);
  const openingMsg = useSelector((state) => state.reservation?.message);
  const errorResponse = useSelector((state) => state.reservation?.error);

  useEffect(() => {
      dispatch(getOpeningMessage(openingMessageID))
  }, [])

  useEffect(() => {
      if(ticket){
        ticketRef.current = [
          `Nama: ${ticket.name}`, `Tanggal: ${formattingDate(new Date(), 'dmmy-time')}`, 
          `Jam: ${ticket.shiftHour}`, `Phone: ${ticket.phone}`
        ]
        handleSetDialog("ticket")
      } else if(ticketInfoFull){
        ticketRef.current = [ticketInfoFull.message];
        handleSetDialog("infoFull")
      } else if(openingMsg && !ticketInfoFull){
        ticketRef.current = [openingMsg.message];
        handleSetDialog("message")
      }
  }, [ticket, ticketInfoFull, openingMsg])

  useEffect(() => {
    if(errorResponse){
      console.log(errorResponse.data);
      setResMessage(errorResponse.data.message)
      setIsAlert(true)
    }
  }, [errorResponse])

  const handleSetDialog = (type) => {
    titleRef.current = messageObj[type].title;
    footerRef.current = messageObj[type].footer;
    styleRef.current = messageObj[type].bgColor;
    iconRef.current = messageObj[type].icon;
    setTicketDialogOpen(true);
  }

  const handleClickButton = () => {
    setTicketDialogOpen(false);
    dispatch({ type: RESET_CUSTOMER });
    dispatch(getAvailableDates);
  }

  return (
    <Grow in>
      <Grid sx={{backgroundColor: 'rgb(54, 91, 109)'}}>
        <Container maxWidth="xl" sx={{padding: 2, position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          <Link href={whatsappLink} target="_blank" rel="noopener">
              <ResponsiveAvatar src={whatsAppImg} variant='square' />
          </Link>
          <ResponsiveBGGrid container>
            <ResponsiveTitleGrid item sm={12} md={4}>
              <Box sx={{ maxWidth: '400px' }}>
                <HeadText />
              </Box>
            </ResponsiveTitleGrid>
            <Grid item sm={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ResponsiveBox>
                <ReservationForm />
                <Footer />
              </ResponsiveBox>
            </Grid>
          </ResponsiveBGGrid>
          <TicketDialog dialogOpen={ticketDialogOpen} setDialogOpen={setTicketDialogOpen} dialogStyle={styleRef.current}
              handleClickButton={handleClickButton} title={titleRef.current} contentArr={ticketRef.current} footer={footerRef.current} icon={iconRef.current}
          />
          <MessageSnackbar isAlert={isAlert} setIsAlert={setIsAlert} messageRes={resMessage} type='warning' />
        </Container>
      </Grid>
    </Grow>
  )
}

export default Home