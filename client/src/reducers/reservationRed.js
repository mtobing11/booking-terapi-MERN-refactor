import { GET_OPEN_DATES, ERROR_CUSTOMER, CREATE_TICKET } from '../constants/actionTypes';
import { sortDateArr, formattingDate } from '../utils/utils';

export default(state = { dates: [], error: '', ticket: null, message: ''}, action) => {
    switch (action.type){
        case GET_OPEN_DATES:
            return { ...state, dates: action.payload }
        case CREATE_TICKET:
            return { ...state, ticket: action.payload }
        default:
            return state
    }
}