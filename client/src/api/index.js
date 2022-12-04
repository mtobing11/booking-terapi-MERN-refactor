import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})

export const fetchAllDates = () => API.get('/dashboard/dates');
export const createNewDate = (dateForm) => API.post('/dashboard/dates/new', dateForm);
export const updateDate = (dateForm, id) => API.patch(`/dashboard/dates/${id}`, dateForm);
export const deleteDate = (id) => API.delete(`/dashboard/dates/${id}`);

export const fetchMessage = (id) => API.get(`/dashboard/message/${id}`);
export const createNewMessage = (messageForm) => API.post('/dashboard/message/new', messageForm);
export const updateMessage = (messageForm, id) => API.patch(`/dashboard/message/${id}`, messageForm);

export const fetchSetup = (id) => API.get(`/dashboard/setup/${id}`);
export const createNewSetup = (setupForm) => API.post('/dashboard/setup/new', setupForm);
export const updateSetup = (setupForm, id) => API.patch(`/dashboard/setup/${id}`, setupForm);

export const signUp = (signForm) => API.post('/user/signup', signForm);
export const signIn = (signForm) => API.post('/user/signin', signForm);