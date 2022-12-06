import * as React from 'react';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { RESET } from '../../constants/actionTypes';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MessageSnackbar = ({  isAlert, setIsAlert, messageRes, type }) => {
  const dispatch = useDispatch();
  const [respondMessage, setRespondMessage] = React.useState("")

  React.useEffect(() => {
    setRespondMessage(messageRes)
  }, [messageRes])
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsAlert(false);
    dispatch({ type: RESET })
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={isAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%', fontSize: '1.5rem' }}>
          {messageRes}
        </Alert>
      </Snackbar>
      {/* <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert> */}
    </Stack>
  )
}

export default MessageSnackbar