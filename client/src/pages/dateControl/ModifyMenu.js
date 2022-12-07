import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import components
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModifyDialog from '../../components/dashboard/dialogs/ModifyDialog';

// import actions
import { handleDataToEdit , updateDate, deleteDate } from '../../actions/dashboardAct';

// import functions
import { formattingDate } from '../../utils/utils';

const ModifyMenu = ({ id, data }) => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState("");
  const [textContent, setTextContent] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  
  const handleClose = (e) => {
    setAnchorEl(null);
    const { myValue } = (e.currentTarget.dataset)

    switch(myValue){
        case 'edit':
            return dispatch(handleDataToEdit(id))
        case 'statusChange': {
            setAction("statusChange")
            setTextContent(`Want to ${data.status ? 'CLOSE' : 'OPEN'} date: ${formattingDate(new Date(data.openDate), 'dmmy-time')}?`)
            return setDialogOpen(true)
        }
        case 'delete':
            setAction("delete")
            setTextContent(`Want to DELETE date: ${formattingDate(new Date(data.openDate), 'dmmy-time')}?`)
            return setDialogOpen(true)
        default:
            return console.log('do nothing')
    }
  };

  const handleSubmit = () => {
    setDialogOpen(false);
    if(action === 'statusChange'){handleStatusChange()}
    else if(action === 'delete'){
      dispatch(deleteDate(id))
    }
    else { console.log('do nothing, something wrong')}
  }

  const handleStatusChange = () => {
    let obj = { ...data, status: !data.status}
    return dispatch(updateDate(obj, id))
  }

  return (
    <>
        <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}
        >
        <MoreVertIcon />
        </Button>
        {data && (
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
              <MenuItem data-my-value="edit" onClick={(e) => handleClose(e)}>Edit</MenuItem>
              <MenuItem data-my-value="statusChange" onClick={(e) => handleClose(e)}>{data.status ? "Close" : "Open"}</MenuItem>
              <MenuItem data-my-value="delete" onClick={(e) => handleClose(e)}>Delete</MenuItem>
          </Menu>
        )}
        {dialogOpen && (
          <ModifyDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} handleSubmit={handleSubmit} textContent={textContent}/>
        )}
        
    </>
  )
}

export default ModifyMenu