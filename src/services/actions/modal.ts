import { baseUrl, checkResponse } from '../../utils/fetchData';
import { resetCart } from './burgerConstructor';
import {
    CLOSE_MODAL,
    GET_ORDER_MODAL_FAILED,
    GET_ORDER_MODAL_REQUEST,
    GET_ORDER_MODAL_SUCCESS,
    OPEN_FEED_MODAL,
    OPEN_INGREDIENT_MODAL,
    SELECT_FEED_INGREDIENT,
    SELECT_INGREDIENT,
    UPDATE_ORDER_MODAL,
} from '../constants/modalTypes';
import { TModalResponse } from '../types/data';
import { TItem, TOrder } from '../../types';
import { AppDispatch, AppThunk } from '../types';
import { getCookie } from '../../utils/cookies';

export interface IOrderModalRequest {
    readonly type: typeof GET_ORDER_MODAL_REQUEST;
};

export interface IOrderModalSuccess {
    readonly type: typeof GET_ORDER_MODAL_SUCCESS;
    readonly payload: number;
};

export interface IOrderModalFailed {
    readonly type: typeof GET_ORDER_MODAL_FAILED;
};

export interface IOpenModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    readonly payload: TItem;
};

export interface ISelectIngredient {
    readonly type: typeof SELECT_INGREDIENT;
    readonly payload: TItem;
};

export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL;
};

export interface IUpdateOrderModal {
    readonly type: typeof UPDATE_ORDER_MODAL;
    readonly payload: Array<string>;
};

export interface IOpenFeedModal {
    readonly type: typeof OPEN_FEED_MODAL;
    readonly payload: TOrder;
};

export interface ISelectFeedIngredient {
    readonly type: typeof SELECT_FEED_INGREDIENT;
    readonly payload: TOrder;
};

export type TModalActions = 
    | IOrderModalRequest
    | IOrderModalSuccess
    | IOrderModalFailed
    | IOpenModal
    | ISelectIngredient
    | ICloseModal
    | IUpdateOrderModal
    | IOpenFeedModal
    | ISelectFeedIngredient;

export const orderModalRequest = (): IOrderModalRequest => {
    return {
        type: GET_ORDER_MODAL_REQUEST
    };
};

export const orderModalSuccess = (data: TModalResponse): IOrderModalSuccess => {
    return {
        type: GET_ORDER_MODAL_SUCCESS,
        payload: data.order.number
    };
};

export const orderModalFailed = (): IOrderModalFailed => {
    return {
        type: GET_ORDER_MODAL_FAILED
    };
};

export const openModal = (ingredient: TItem): IOpenModal => {
    return {
        type: OPEN_INGREDIENT_MODAL,
        payload: ingredient
    };
};

export const selectIngredient = (ingredient: TItem): ISelectIngredient => {
    return {
        type: SELECT_INGREDIENT,
        payload: ingredient
    };
};

export const closeModal = (): ICloseModal => {
    return {
        type: CLOSE_MODAL
    }
};

export const updateOrderModal = (arrayOfIds: Array<string>): IUpdateOrderModal => {
    return {
        type: UPDATE_ORDER_MODAL,
        payload: arrayOfIds
    };
};

export const openFeedModal = (feed: TOrder): IOpenFeedModal => {
    return {
        type: OPEN_FEED_MODAL,
        payload: feed
    };
};

export const selectFeedIngredient = (feed: TOrder): ISelectFeedIngredient => {
    return {
        type: SELECT_FEED_INGREDIENT,
        payload: feed
    };
};

export const getOrderId: AppThunk = (body: Array<string>) => (dispatch: AppDispatch) => {
    dispatch(orderModalRequest());

    fetch(`${baseUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify(body)
    })
    .then(checkResponse)
    .then(data => {
        dispatch(orderModalSuccess(data));
        dispatch(resetCart());
    })
    .catch(e => {
        dispatch(orderModalFailed());
        console.log(`Что-то пошло не так ${e}`);
    })
}