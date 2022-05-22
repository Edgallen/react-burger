import {baseUrl, checkResponse} from "../../utils/fetchData";

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export function resetPassword(body: any) {
    console.log(body)
    return (dispatch: any) => {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: RESET_PASSWORD_SUCCESS });
            console.log(data)
        })
        .catch(e => {
            dispatch({ type: RESET_PASSWORD_FAILED });
            console.log(`Что-то пошло не так ${e}`);
        })
    }
}