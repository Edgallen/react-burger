import { TItem } from "../../types";
import { TModalActions } from "../actions/modal";
import {
    CLOSE_MODAL,
    UPDATE_ORDER_MODAL,
    GET_ORDER_MODAL_FAILED,
    GET_ORDER_MODAL_REQUEST,
    GET_ORDER_MODAL_SUCCESS,
    OPEN_INGREDIENT_MODAL,
    SELECT_INGREDIENT
} from "../constants/modal";

export type TCartItem = {
    [key: string]: string
}

type TModalState = {
    ingredientModal: {
        selectedIngredient: TItem | {};
        isVisible: boolean;
    };
    orderModal: {
        orderId: number;
        cartId: Array<string>;
        isLoading: boolean;
        isFailed: boolean;
        isVisible: boolean;
    }
}

const initialState: TModalState = {
    ingredientModal: {
        selectedIngredient: {},
        isVisible: false
    },

    orderModal: {
        orderId: 0,
        cartId: [],
        isLoading: false,
        isFailed: false,
        isVisible: false
    }
};

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
    switch (action.type) {
        case CLOSE_MODAL: {
            return {
                ...state,
                ingredientModal: {...state.ingredientModal, isVisible: false},
                orderModal: {...state.orderModal, isVisible: false}
            };
        }
        case UPDATE_ORDER_MODAL: {
            return {
                ...state,
                orderModal: {...state.orderModal, cartId: action.payload}
            }
        }
        case OPEN_INGREDIENT_MODAL: {
            return {
                ...state,
                ingredientModal: {
                    ...state.ingredientModal,
                    selectedIngredient: action.payload,
                    isVisible: true
                }
            };
        }
        case GET_ORDER_MODAL_REQUEST: {
            return {
                ...state,
                orderModal: {
                    ...state.orderModal,
                    isLoading: true,
                    isVisible: true
                }
            };
        }
        case GET_ORDER_MODAL_SUCCESS: {
            return {
                ...state,
                orderModal: {
                    ...state.orderModal,
                    orderId: action.payload,
                    isLoading: false,
                    isFailed: false,
                    isVisible: true
                }
            };
        }
        case GET_ORDER_MODAL_FAILED: {
            return {
                ...state,
                orderModal: {
                    ...state.orderModal,
                    isFailed: true,
                    isVisible: true
                }
            };
        }
        case SELECT_INGREDIENT: {
            return {
                ...state,
                ingredientModal: {
                    ...state.ingredientModal,
                    selectedIngredient: action.payload
                }
            };
        }
        default: {
            return state;
        }
    }
}