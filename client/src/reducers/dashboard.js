import { GET_ALL_DATES, NEW_DATE, UPDATE_DATE, DELETE_DATE, ACTIVE_MENU, RESIZE_SCREEN, SETUP, SET_EDIT_DATE, RESET, ERROR, GET_OPENING_MESSAGE, UPDATE_MESSAGE, UPDATE_SETUP } from '../constants/actionTypes';
import { sortDateArr, formattingDate } from '../utils/utils'

export default(state = { activeMenu: true, dates: [], error: '', success: '', message: ''}, action) => {
    switch (action.type){
        case GET_ALL_DATES:
            return { ...state, dates: action.payload }
        case NEW_DATE: {
            let newArr = [...state.dates, action.payload];
            return { ...state, dates: sortDateArr(newArr, 'openDate'), success: 'Success Open the Date' }
        }
        case UPDATE_DATE:
            return { ...state, dates: state.dates.map((date) => date._id === action.payload._id ? action.payload : date), success: 'Success Edit the Date' }
        case SET_EDIT_DATE: {
            const dateID = action.payload;
            const editDateData = state.dates.filter((date) => date._id === dateID)
            return { ...state, editDateData: editDateData[0], editDateID: dateID }
        }
        case RESET:
            return { ...state, editDateData: '', editDateID: '', error: '', success: '' }
        case DELETE_DATE:
            return { ...state, dates: state.dates.filter((date) => date._id !== action.payload) }
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        case SETUP:
            return { ...state, setup: action.payload }
        case UPDATE_SETUP:
            return { ...state, setup: action.payload, success: 'Success Edit the setup template' }
        case ERROR:
            return { ...state, error: action.payload }
        case GET_OPENING_MESSAGE:
            return { ...state, message: action.payload }
        case UPDATE_MESSAGE:
            return { ...state, message: action.payload, success: 'Success update message' }
        default:
            return state
    }
}