import * as api from '../api';
import { GET_ALL_DATES, NEW_DATE, UPDATE_DATE, DELETE_DATE, ACTIVE_MENU, RESIZE_SCREEN, SETUP, SET_EDIT_DATE, RESET, ERROR, GET_OPENING_MESSAGE, UPDATE_MESSAGE, UPDATE_SETUP } from  '../constants/actionTypes';

// import functions
import { sortDateArr, cutArray, arrangeSchedules } from '../utils/utils';

// get all dates
export const getAllDates = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAllDates();
        dispatch({ type: GET_ALL_DATES, payload: sortDateArr(data, 'openDate') })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, payload: error.response });
    }
}

// create new date
export const openNewDate = (dateForm) => async (dispatch) => {
    console.log("open date action");

    let schedulesArr = arrangeSchedules(dateForm);
    dateForm.schedules = schedulesArr;

    // console.log(dateForm);
    
    try {
        const { data } = await api.createNewDate(dateForm);
        dispatch({ type: NEW_DATE, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error.response });
    }
}

// set data to date form to edit
export const handleDataToEdit = (id) => (dispatch) => {
    dispatch({ type: SET_EDIT_DATE, payload: id })
}

// update existing date
export const updateDate = (dateForm, id) => async (dispatch) => {
    let schedulesArr = arrangeSchedules(dateForm);
    dateForm.schedules = schedulesArr;

    try {
        const { data } = await api.updateDate(dateForm, id);
        dispatch({ type: UPDATE_DATE, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, payload: error.response });
    }
}

// delete a date
export const deleteDate = (id) => async (dispatch) => {
    console.log("Delete a date");

    try {
        await api.deleteDate(id);
        dispatch({ type: DELETE_DATE, payload: id });
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, payload: error.response });
    }
}

// handle menu
export const handleActiveMenu = (activeMenu) => (dispatch) => {
    dispatch({ type: ACTIVE_MENU, payload: activeMenu })
}

// handle screen size
export const handleResizeScreen = (screenSize) => (dispatch) => {
    dispatch({ type: RESIZE_SCREEN, payload: screenSize })
}

// get setup template
export const getSetup = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSetup(id);
        dispatch({  type: SETUP, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, payload: error.response });
    }
}

// update setup Template
export const updateSetupTemplate = (setupForm, id) => async (dispatch) =>{
    try {
        const { data } = await api.updateSetup(setupForm, id);
        dispatch({  type: UPDATE_SETUP, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// get opening message
export const getOpeningMessage = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchMessage(id);
        dispatch({  type: GET_OPENING_MESSAGE, payload: data })
    } catch (error) {
        console.log(error)
    }
}

// update opening message
export const updateOpeningMessage = (messageForm, id) => async (dispatch) =>{
    try {
        const { data } = await api.updateMessage(messageForm, id);
        dispatch({  type: UPDATE_MESSAGE, payload: data })
    } catch (error) {
        console.log(error)
    }
}
