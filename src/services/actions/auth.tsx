import {baseUrl, checkResponse} from "../../utils/fetchData";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const RECOVERY_FAILED = 'RECOVERY_FAILED';

export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

export const SET_USER = 'SET_USER';

const signIn = (data: any) => {
    return{
        type: SIGN_IN_USER,
        payload: data
    };
};

const setUser = (data: any) => {
    return{
        type: SET_USER,
        payload: data
    };
};


export function loginUser(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            if (!data.success) {
                console.log(data)
            } else {
                const accessToken = data.accessToken.split('Bearer ')[1];
                console.log(accessToken)
                const refreshToken = data.refreshToken;
                if (accessToken) {
                    setCookie('token', accessToken);
                }
                if (refreshToken) {
                    setCookie('refreshToken', refreshToken);
                }
                dispatch(signIn({
                    ...data.user
                }))
            }
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function logoutUser(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            if (!data.success) {
                console.log(data)
            } else {
                deleteCookie('token');
                deleteCookie('refreshToken');
                dispatch({
                    type: SIGN_OUT_USER
                });
            }
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function registerUser(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            if (!data.success) {
                console.log(data)
            } else {
                const accessToken = data.accessToken.split('Bearer ')[1];
                const refreshToken = data.refreshToken;
                if (accessToken) {
                    setCookie('token', accessToken);
                }
                if (refreshToken) {
                    setCookie('refreshToken', refreshToken);
                }
                dispatch({ type: REGISTER_USER_SUCCESS });
            }
        })
        .catch(e => {
            dispatch({ type: REGISTER_USER_FAILED })
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function requestRecovery(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: RECOVERY_SUCCESS });
        })
        .catch(e => {
            dispatch({ type: RECOVERY_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function resetPassword(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: RESET_SUCCESS });
        })
        .catch(e => {
            dispatch({ type: RESET_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function getUser() {
    return (dispatch: any) => {
        fetch(`${baseUrl}/auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
        })
        .then(checkResponse)
        .then(data => {
            dispatch(setUser(data));
        })
        .catch(e => {
            dispatch({ type: RESET_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export function updateUser(body: any) {
    return (dispatch: any) => {
        fetch(`${baseUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify(body)
        })
            .then(checkResponse)
            .then(data => {
                dispatch(setUser(data));
            })
            .catch(e => {
                dispatch({ type: RESET_FAILED });
                console.log(`Что-то пошло не так ${e}`);
            })
    };
}