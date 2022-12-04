import * as api from '../api';
import { GET_ALL_DATES, NEW_DATE, UPDATE_DATE, DELETE_DATE, ACTIVE_MENU, RESIZE_SCREEN, SETUP, SET_EDIT_DATE, RESET, ERROR } from  '../constants/actionTypes';

// import functions
import { sortDateArr, cutArray } from '../utils/utils';

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
    dateForm.schedules = cutArray(dateForm.schedules, dateForm.shifts)
    
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
    console.log("update date");
    dateForm.schedules = cutArray(dateForm.schedules, dateForm.shifts);

    try {
        const { data } = await api.updateDate(dateForm, id);
        dispatch({ type: UPDATE_DATE, payload: data });
        dispatch({ type: RESET })
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

// get setup
export const getSetup = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchSetup(id);
        dispatch({  type: SETUP, payload: data })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, payload: error.response });
    }
}