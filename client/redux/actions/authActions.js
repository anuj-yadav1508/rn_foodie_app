import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const DIDTRYLOGIN = 'DIDTRYLOGIN';
export const AUTHENTICATION = 'AUTHENTICATION';
export const LOGOUT = 'LOGOUT';

export const authentication = (user) => {
    return { type: AUTHENTICATION, user: user };
};

export const didTryLogin = () => {
    return { type: DIDTRYLOGIN };
};

export const signup = (name, email, password) => {
    return async dispatch => {
        try {
            const res = await axios({
                url: 'http://172.20.10.2:8800/api/auth/register',
                method: 'post',
                data: {
                    username: name,
                    email,
                    password
                }
            });
        } catch (err) {
            let message = 'Something went wrong!';
            if(err.message === 'Request failed with status code 404') {
                message = 'Url not found!'
            };
            if(err.message === 'Request failed with status code 401') {
                message = 'Email already registered, Try anoter email!'
            };
            if(err.message === 'Request failed with status code 500') {
                message = 'Server error!'
            };

            throw new Error(message);
        }
    };
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios({
                url: 'http://172.20.10.2:8800/api/auth/login',
                method: 'post',
                data: {
                    email,
                    password
                }
            });

            dispatch({ type: LOGIN, user: res.data});
            saveDataToStorage(res.data);
        } catch (err) {
            let message = 'Something went wrong!';
            if(err.message === 'Request failed with status code 404') {
                message = 'Url not found!'
            };
            if(err.message === 'Request failed with status code 401') {
                message = 'Email already registered, Try anoter email!'
            };
            if(err.message === 'Request failed with status code 500') {
                message = 'Server error!'
            };
            if(err.message === 'Request failed with status code 402') {
                message = 'Password is not correct!'
            };

            throw new Error(message);
        }
    };
};

// logout 
export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

// saving user to ASync storage
const saveDataToStorage = (user) => {
    AsyncStorage.setItem('userData', JSON.stringify(user));
};