import { TItem, TItemEmpty } from "../../types";
import { TBurgerConstructorActions } from "../actions/burgerConstructor";
import {
    ADD_TO_CART,
    ADD_BUN,
    SET_CART,
    REMOVE_FROM_CART,
    RESET_CART
} from "../constants/burgerConstructorTypes";

type TBurgerConstructorState = {
    cart: Array<TItem>;
    bun: TItem | TItemEmpty;
    isLoading: boolean;
}

const initialState: TBurgerConstructorState = {
    cart: [],
    bun: {},
    isLoading: true
};

export const constructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
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
                    bun: {},
                    isLoading: true
            }
        }
        default: {
            return state;
        }
    }
}