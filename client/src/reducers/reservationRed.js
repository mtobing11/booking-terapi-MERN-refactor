import { GET_OPEN_DATES, ERROR_CUSTOMER, CREATE_TICKET, RESET_CUSTOMER } from '../constants/actionTypes';
import { sortDateArr, formattingDate } from '../utils/utils';

export default(state = { dates: [], error: null, ticket: null, message: null}, action) => {
    switch (action.type){
        case GET_OPEN_DATES:
            return { ...state, dates: action.payload }
        case CREATE_TICKET:
            return { ...state, ticket: action.payload }
        case RESET_CUSTOMER:
            return { ...state, ticket: null, error: null }
        case ERROR_CUSTOMER:
            return { ...state, error: action.payload }
        default:
            return state
    }
}