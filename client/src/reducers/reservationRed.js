import { GET_OPEN_DATES, ERROR_CUSTOMER, CREATE_TICKET, CREATE_TICKET_INFO, RESET_CUSTOMER, OPENING_MESSAGE_CUSTOMER } from '../constants/actionTypes';
import { sortDateArr, formattingDate } from '../utils/utils';

export default(state = { dates: [], error: null, ticket: null, ticketInfo: null, message: null}, action) => {
    switch (action.type){
        case GET_OPEN_DATES:
            return { ...state, dates: action.payload }
        case CREATE_TICKET:{
            let infoDate = state.dates.filter(date => date._id === action.payload.scheduleId)
            let infoShift = infoDate[0].schedules.filter(shift => shift._id === action.payload.shiftId)
            let newData = { ...action.payload, shiftHour: infoShift[0].schedule }
            
            return { ...state, ticket: newData }
        }
        case CREATE_TICKET_INFO:
            return { ...state, ticketInfo: action.payload }
        case RESET_CUSTOMER:
            return { ...state, ticket: null, ticketInfo: null, error: null, message: null }
        case ERROR_CUSTOMER:
            return { ...state, error: action.payload }
        case OPENING_MESSAGE_CUSTOMER:
            return { ...state, message: action.payload }
        default:
            return state
    }
}