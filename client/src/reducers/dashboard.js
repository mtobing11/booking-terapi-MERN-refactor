import { GET_ALL_DATES, NEW_DATE, UPDATE_DATE, DELETE_DATE, ACTIVE_MENU, RESIZE_SCREEN, SETUP, SET_EDIT_DATE, RESET, ERROR } from '../constants/actionTypes';
import { sortDateArr } from '../utils/utils'

export default(state = { activeMenu: true, dates: [], error: '' }, action) => {
    switch (action.type){
        case GET_ALL_DATES:
            return { ...state, dates: action.payload }
        case NEW_DATE: {
            let newArr = [...state.dates, action.payload];
            return { ...state, dates: sortDateArr(newArr, 'openDate') }
        }
        case UPDATE_DATE:
            return { ...state, dates: state.dates.map((date) => date._id === action.payload._id ? action.payload : date) }
        case SET_EDIT_DATE: {
            const dateID = action.payload;
            const editDateData = state.dates.filter((date) => date._id === dateID)
            return { ...state, editDateData: editDateData[0], editDateID: dateID }
        }
        case RESET:
            return { ...state, editDateData: '', editDateID: '', error: '' }
        case DELETE_DATE:
            return { ...state, dates: state.dates.filter((date) => date._id !== action.payload) }
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        case SETUP:
            return { ...state, setup: action.payload }
        case ERROR:
            return { ...state, error: action.payload }
        default:
            return state
    }
}