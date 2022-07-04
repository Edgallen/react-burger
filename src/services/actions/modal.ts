import { baseUrl, checkResponse } from '../../utils/fetchData';
import { resetCart } from './burgerConstructor';
import {
    CLOSE_MODAL,
    GET_ORDER_MODAL_FAILED,
    GET_ORDER_MODAL_REQUEST,
    GET_ORDER_MODAL_SUCCESS,
    OPEN_INGREDIENT_MODAL,
    SELECT_INGREDIENT,
    UPDATE_ORDER_MODAL,
} from '../constants/modalTypes';
import { TModalResponse } from '../types/data';
import { TItem } from '../../types';
import { AppDispatch, AppThunk } from '../types';

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

export type TModalActions = 
    | IOrderModalRequest
    | IOrderModalSuccess
    | IOrderModalFailed
    | IOpenModal
    | ISelectIngredient
    | ICloseModal
    | IUpdateOrderModal;

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

  export const getOrderId: AppThunk = (body: string) => (dispatch: AppDispatch) => {
        dispatch(orderModalRequest());

        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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