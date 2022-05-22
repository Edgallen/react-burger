import {
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
} from "../actions/auth";

const initialState = {
    recoveryEmail: '',
    recoverIsLoading: true,
    recoverIsFailed: false,

};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                recoverIsLoading: true
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                recoverIsLoading: false,
                recoverIsFailed: false
            };
        }
        case RESET_PASSWORD_FAILED: {
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