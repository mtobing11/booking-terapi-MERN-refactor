import { GET_ALL_DATES, NEW_DATE, UPDATE_DATE, DELETE_DATE, ACTIVE_MENU, RESIZE_SCREEN } from '../constants/actionTypes';
import { sortDateArr } from '../utils/utils'

export default(state = { activeMenu: true, dates: [] }, action) => {
    switch (action.type){
        case GET_ALL_DATES:
            return { ...state, dates: action.payload }
        case NEW_DATE: {
            let newArr = [...state.dates, action.payload];
            return { ...state, dates: sortDateArr(newArr, 'openDate') }
        }
        case UPDATE_DATE:
            return { ...state, dates: state.dates.map((date) => date._id === action.payload._id ? action.payload : date) }
        case DELETE_DATE:
            return { ...state, dates: state.dates.filter((date) => date._id !== action.payload) }
        case ACTIVE_MENU:
            return { ...state, activeMenu: action.payload }
        case RESIZE_SCREEN:
            return { ...state, screenSize: action.payload }
        default:
            return state
    }
}