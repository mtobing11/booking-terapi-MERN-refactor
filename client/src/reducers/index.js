import { combineReducers } from 'redux';
import dashboard from './dashboard';
import auth from './auth';
import reservation from './reservationRed';

export default combineReducers({ auth, dashboard, reservation });