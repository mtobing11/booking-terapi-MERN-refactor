import * as api from '../api';
import { GET_OPEN_DATES, ERROR_CUSTOMER , CREATE_TICKET } from '../constants/actionTypes';

// import functions
import { sortDateArr, cutArray } from '../utils/utils';

// get available dates
export const getAvailableDates = () => async (dispatch) => {
    try {
        const { data } = await api.fetchAvailableDates();
        dispatch({ type: GET_OPEN_DATES, payload: sortDateArr(data, 'openDate') })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_CUSTOMER, payload: error.response });
    }
}

// make a reservation
export const makeReservation = (reservationForm, id) => async (dispatch) => {
    try {
        console.log('id:', id)
        console.log(reservationForm)
        const { data } = await api.makeReservation(id, reservationForm);
        console.log(data)
       
        let arrIdString = data.bookIdArr.join("-");
        console.log(arrIdString);
        const { data: reservationData } = await api.fetchDataCustomer(id, arrIdString, data.cellphone)
        // const { data: reservationData } = await api.fetchDataCustomer(id, data)
        console.log(reservationData);
        // dispatch({ type: CREATE_TICKET, payload: sortDateArr(data, 'openDate') })
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR_CUSTOMER, payload: error.response });
    }
}