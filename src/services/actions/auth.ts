import {baseUrl, checkResponse} from "../../utils/fetchData";
import {deleteCookie, getCookie, setCookie} from "../../utils/cookies";
import { 
    RECOVERY_FAILED,
    RECOVERY_REQUEST,
    RECOVERY_SUCCESS,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS,
    RESET_FAILED,
    RESET_SUCCESS,
    SET_USER,
    SIGN_IN_USER, 
    SIGN_OUT_USER
 } from "../constants/authTypes";
import { TChangeUser, TUser } from "../types/data";
import { TAuthBody } from "../../types";
import { AppDispatch, AppThunk } from "../types";

export interface IsignIn {
    readonly type: typeof SIGN_IN_USER;
    readonly payload: TUser;
}

export interface IsignOut {
    readonly type: typeof SIGN_OUT_USER;
}

export interface IregisterUserSuccess {
    readonly type: typeof REGISTER_USER_SUCCESS;
}

export interface IregisterUserFailed {
    readonly type: typeof REGISTER_USER_FAILED;
}

export interface IrecoveryRequest {
    readonly type: typeof RECOVERY_REQUEST;
}

export interface IrecoverySuccess {
    readonly type: typeof RECOVERY_SUCCESS;
}

export interface IrecoveryFailed {
    readonly type: typeof RECOVERY_FAILED;
}

export interface IresetSuccess {
    readonly type: typeof RESET_SUCCESS;
}

export interface IresetFailed {
    readonly type: typeof RESET_FAILED;
}

export interface IsetUser {
    readonly type: typeof SET_USER;
    readonly payload: TChangeUser;
}

export interface IloginUser {
    readonly type: typeof SET_USER;

}

export type TAuthActions = 
  | IsignIn
  | IsignOut
  | IregisterUserSuccess
  | IregisterUserFailed
  | IrecoveryRequest
  | IrecoverySuccess
  | IrecoveryFailed
  | IresetSuccess
  | IresetFailed
  | IsetUser;

const signIn = (data: TUser): IsignIn => {
    return {
        type: SIGN_IN_USER,
        payload: data
    };
};

const signOut = (): IsignOut => {
    return {
        type: SIGN_OUT_USER
    };
};

const registerUserSuccess = (): IregisterUserSuccess => {
    return {
        type: REGISTER_USER_SUCCESS
    };
};

const registerUserFailed = (): IregisterUserFailed => {
    return {
        type: REGISTER_USER_FAILED
    };
};

export const recoveryRequest = (): IrecoveryRequest => {
    return {
        type: RECOVERY_REQUEST
    };
};

const recoverySuccess = (): IrecoverySuccess => {
    return {
        type: RECOVERY_SUCCESS
    };
};

const recoveryFailed = (): IrecoveryFailed => {
    return {
        type: RECOVERY_FAILED
    };
};

const resetSuccess = (): IresetSuccess => {
    return {
        type: RESET_SUCCESS
    };
};

const resetFailed = (): IresetFailed => {
    return {
        type: RESET_FAILED
    };
};

const setUser = (data: TChangeUser): IsetUser => {
    return {
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
            const accessToken = data.accessToken.split('Bearer ')[1];
            const refreshToken = data.refreshToken;
            if (accessToken) {
                setCookie('token', accessToken);
            }
            if (refreshToken) {
                setCookie('refreshToken', refreshToken);
            }

            dispatch(signIn({ ...data.user }));
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}

export const logoutUser: AppThunk = (body: string) => (dispatch: AppDispatch) => {
        fetch(`${baseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            deleteCookie('token');
            deleteCookie('refreshToken');
            dispatch(signOut());
        })
        .catch(e => {
            console.log(`Что-то пошло не так ${e}`);
        })
}

export const registerUser: AppThunk = (body: string) => (dispatch: AppDispatch) => {
    fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(checkResponse)
    .then(data => {
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        if (accessToken) {
            setCookie('token', accessToken);
        }
        if (refreshToken) {
            setCookie('refreshToken', refreshToken);
        }
        dispatch(registerUserSuccess());
    })
    .catch(e => {
        dispatch(registerUserFailed())
        console.log(`Что-то пошло не так ${e}`);
    })
}

export const updateToken: AppThunk = () => (dispatch: AppDispatch) => {
    fetch(`${baseUrl}/auth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'token': getCookie('refreshToken') })
    })
    .then(checkResponse)
    .then(data => {
        const accessToken = data.accessToken.split('Bearer ')[1];
        const refreshToken = data.refreshToken;
        if (accessToken) {
            setCookie('token', accessToken);
        }
        if (refreshToken) {
            setCookie('refreshToken', refreshToken);
        }
        console.log('Токены обновились');
    })
    .catch(e => {
        dispatch(registerUserFailed())
        console.log(`Что-то пошло не так ${e}`);
    })
}

export const requestRecovery: AppThunk = (body: {email: string}) =>
    (dispatch: AppDispatch) => {
        fetch(`${baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            dispatch(recoverySuccess());
        })
        .catch(e => {
            dispatch(recoveryFailed());
            console.log(`Что-то пошло не так ${e}`);
        })
}

export const resetPassword: AppThunk = (body: {password: string; token: string;}) =>
    (dispatch: AppDispatch) => {
        fetch(`${baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(() => {
            dispatch(resetSuccess());
        })
        .catch(e => {
            dispatch(resetFailed());
            console.log(`Что-то пошло не так ${e}`);
        })
}

export const getUser: AppThunk = () => (dispatch) => {
    fetch(`${baseUrl}/auth/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
    })
    .then(checkResponse)
    .then(data => {
        if (data.success) {
            dispatch(setUser(data));
        } else {
            dispatch(updateToken());
        }
    })
    .catch(e => {
        dispatch(resetFailed());
        console.log(`Что-то пошло не так ${e}`);
    })
}

export const updateUser: AppThunk = (body: TAuthBody) => (dispatch: AppDispatch) => {
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
        dispatch(resetFailed());
        console.log(`Что-то пошло не так ${e}`);
    })
}