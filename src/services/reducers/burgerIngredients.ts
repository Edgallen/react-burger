import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS
} from "../actions/burgerIngredients";

const initialState = {
    ingredients: [],
    isLoading: false,
    isFailed: false
};

export const ingredientsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                isLoading: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredients: action.payload,
                isLoading: false,
                isFailed: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                isFailed: true
            }
        }
        default: {
            return state;
        }
    }
};