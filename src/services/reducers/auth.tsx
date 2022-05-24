import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    RECOVERY_FAILED,
    RECOVERY_SUCCESS,
    SIGN_IN_USER,
    SIGN_OUT_USER
} from "../actions/auth";

const initialState = {
    isAuth: false,
    authFailed: false,

    recoveryRequest: false,
    recoverIsFailed: false,
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SIGN_IN_USER: {
            return {
                ...state,
                isAuth: true,
                authFailed: false,
            };
        }
        case SIGN_OUT_USER: {
            return {
                ...state,
                isAuth: false,
                authFailed: false,
            };
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                isAuth: true,
                authFailed: false
            };
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                authFailed: true
            };
        }
        case RECOVERY_SUCCESS: {
            return {
                ...state,
                recoveryRequest: true,
                recoverIsFailed: false
            };
        }
        case RECOVERY_FAILED: {
            return {
                ...state,
                recoverIsFailed: true
            };
        }
        default: {
            return state;
        }
    }
};