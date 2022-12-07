import * as api from '../api';
import { AUTH } from  '../constants/actionTypes';

export const signin = (signForm, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(signForm);
        dispatch({ type: AUTH, data });
        
        navigate('/boardpanel');
    } catch (error) {
        console.log(error)
    }
}

export const signup = (signForm, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(signForm);
        dispatch({ type: AUTH, data });

        navigate('/boardpanel');
    } catch (error) {
        console.log(error)
    }
}