import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import components
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// import actions
import { handleDataToEdit , updateDate, deleteDate } from '../../actions/dashboardAct';

const ModifyMenu = ({ id, data }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => { setAnchorEl(event.currentTarget) }
  
  const handleClose = (e) => {
    setAnchorEl(null);
    const { myValue } = (e.currentTarget.dataset)

    switch(myValue){
        case 'edit':
            return dispatch(handleDataToEdit(id))
        case 'open-close': {
            let obj = { ...data, status: !data.status}
            return dispatch(updateDate(obj, id))
        }
        case 'delete':
            return dispatch(deleteDate(id))
        default:
            return console.log('do nothing')
    }
    // if(myValue==="edit"){
    // //   dispatch(editingExistingBookDate(data))
    // console.log("edit", data)
    // } else if(myValue === "closed"){
    //     console.log("close")
    // //   let newObjData = {...data, available: false}
    // //   dispatch(updateExistingBookDate(newObjData, data._id, false))
    // } else if(myValue === "delete"){
    //   dispatch(deleteDate(data))
    // } else {
    //   console.log("no action executed")
    // }
  };

  return (
    <>
        <Button id="basic-button" aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={handleClick}
        >
        <MoreVertIcon />
        </Button>
        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button', }}>
            <MenuItem data-my-value="edit" onClick={(e) => handleClose(e)}>Edit</MenuItem>
            <MenuItem data-my-value="open-close" onClick={(e) => handleClose(e)}>{data.status ? "Close" : "Open"}</MenuItem>
            <MenuItem data-my-value="delete" onClick={(e) => handleClose(e)}>Delete</MenuItem>
        </Menu>
    </>
  )
}

export default ModifyMenu