import {
    ADD_TO_CART,
    ADD_BUN,
    SET_CART,
    REMOVE_FROM_CART,
    RESET_CART
} from "../actions/burgerConstructor";

const initialState = {
    cart: [],
    bun: {},
    isLoading: true
};

export const constructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            return {
                ...state,
                cart: [...state.cart, action.payload],
                isLoading: false
            }
        }
        case ADD_BUN: {
            return {
                ...state,
                bun: action.payload,
                isLoading: false
            } 
        }
        case SET_CART: {
            return {
                ...state,
                cart: action.payload
            }
        }
        case REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((item, index) => index !== action.payload)
            } 
        }
        case RESET_CART: {
            return {
                ...state,
                    cart: [],
                    cartIds: [],
                    bun: {},
                    isLoading: true
            }
        }
        default: {
            return state;
        }
    }
}