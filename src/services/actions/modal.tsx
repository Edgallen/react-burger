import { baseUrl, checkResponse } from '../../utils/fetchData';
import { resetCart } from './burgerConstructor';

export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const UPDATE_ORDER_MODAL = 'UPDATE_ORDER_MODAL';
export const GET_ORDER_MODAL_REQUEST = 'GET_ORDER_MODAL_REQUEST';
export const GET_ORDER_MODAL_SUCCESS = 'GET_ORDER_MODAL_SUCCESS';
export const GET_ORDER_MODAL_FAILED = 'GET_ORDER_MODAL_FAILED';

export const OPEN_INGREDIENT_MODAL = 'SELECT_INGREDIENT';

export const openModal = (ingredient: any) => {
    return {
        type: OPEN_INGREDIENT_MODAL,
        payload: ingredient
    };
};

export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
};

export const updateOrderModal = (id: any) => {
    return {
        type: UPDATE_ORDER_MODAL,
        payload: id
    };
  };

  export function getOrderId(body: any) {
    return (dispatch: any) => {
        dispatch({
            type: GET_ORDER_MODAL_REQUEST
        });

        fetch(`${baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(checkResponse)
        .then(data => {
            dispatch({ type: GET_ORDER_MODAL_SUCCESS, payload: data.order.number });
            dispatch(resetCart());
        })
        .catch(e => {
            dispatch({ type: GET_ORDER_MODAL_FAILED});
            console.log(`Что-то пошло не так ${e}`);
        })
    };
};