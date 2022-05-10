import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    RESET_CART
} from "../actions/burgerConstructor";

const initialState = {
    cart: [],
    bun: {},
    isLoading: true,
    totalPrice: 0
};

export const constructorReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_TO_CART: {
            if (action.payload.type === 'bun') {
                return {
                    ...state,
                    bun: action.payload
                }
            }
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        }
        case REMOVE_FROM_CART: {
            return {...state} // ДОДЕЛАТЬ!!!!!
        }
        case RESET_CART: {
            return {
                ...state,
                    cart: [],
                    bun: {},
                    isLoading: true,
                    totalPrice: 0
            }
        }
        default: {
            return state;
        }
    }
}