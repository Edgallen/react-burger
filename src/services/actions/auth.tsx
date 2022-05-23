import {baseUrl, checkResponse} from "../../utils/fetchData";

// export const RESET_PASSWORD = 'RESET_PASSWORD';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const RECOVERY_SUCCESS = 'RECOVERY_SUCCESS';
export const RECOVERY_FAILED = 'RECOVERY_FAILED';

export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_FAILED = 'RESET_FAILED';

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
            dispatch({ type: REGISTER_USER_SUCCESS });
            console.log(data);
        })
        .catch(e => {
            dispatch({ type: REGISTER_USER_FAILED })
            console.log(`Что-то пошло не так ${e}`);
        })
    };
};

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
            console.log(data)
        })
        .catch(e => {
            dispatch({ type: RECOVERY_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    }
};

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
            console.log(data)
        })
        .catch(e => {
            dispatch({ type: RESET_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    }
};