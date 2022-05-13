import {
    ADD_TO_CART,
    SET_CART,
    REMOVE_FROM_CART,
    RESET_CART
} from "../actions/burgerConstructor";

const initialState = {
    cart: [],
    cartIds: [],
    bun: {},
    isLoading: true
};

export const constructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload,
                    isLoading: false
                }
            }
            return {
                ...state,
                cart: [...state.cart, action.payload],
                cartIds: [...state.cartIds, action.id],
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