import * as api from '../api';
import { GET_OPEN_DATES, ERROR_CUSTOMER, CREATE_TICKET, CREATE_TICKET_INFO, OPENING_MESSAGE_CUSTOMER } from '../constants/actionTypes';

// import functions
import { sortDateArr, cutArray } from '../utils/utils';

// get available dates
export const getAvailableDates = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAvailableDates();
        if (data.length <= 0) {
            dispatch({ type: CREATE_TICKET_INFO, payload: { message: 'Pendaftaran dibuka setiap Selasa sd Jumat setiap pukul 08.00, dan akan tertutup otomatis jika kuota sudah penuh' } })
        }
        dispatch({ type: GET_OPEN_DATES, payload: sortDateArr(data, 'openDate') })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_CUSTOMER, payload: error.response });
    }
}

// make a reservation
export const makeReservation = (reservationForm, id) => async (dispatch) => {
    try {
        const { data } = await api.makeReservation(id, reservationForm);
        // console.log(data)
        dispatch({ type: CREATE_TICKET, payload: data[0] })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_CUSTOMER, payload: error.response });
    }
}

// get opening message
export const getOpeningMessage = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchMessage(id);
        if(data.status){
            dispatch({  type: OPENING_MESSAGE_CUSTOMER, payload: data })
        }
    } catch (error) {
        console.log(error)
    }
}