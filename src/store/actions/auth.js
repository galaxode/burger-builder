import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    };
};
export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    };
};
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const auth = (email, password, isSignUp) => {
    const authData = {
        email,
        password,
        returnSecureToken: true
    }
    const URL = isSignUp 
        ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' 
        : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
    const API_KEY = 'AIzaSyAb5kJSRBxMsjGRLcdodYwaeF8pYXBLFKQ';
    return dispatch => {
        dispatch(authInit());
        axios.post(`${URL}${API_KEY}`, authData)
            .then(response => {
                console.log('response: ', response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log('error: ', error);
                dispatch(authFail(error));
            });

    }
}