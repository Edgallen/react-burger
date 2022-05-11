export const CLOSE_MODAL = 'CLOSE_MODAL';

export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const UPDATE_ORDER_MODAL = 'UPDATE_ORDER_MODAL';
export const GET_ORDER_MODAL_REQUEST = 'GET_ORDER_MODAL_REQUEST';
export const GET_ORDER_MODAL_SUCCESS = 'GET_ORDER_MODAL_SUCCESS';
export const GET_ORDER_MODAL_FAILED = 'GET_ORDER_MODAL_FAILED';

export const OPEN_INGREDIENT_MODAL = 'SELECT_INGREDIENT';

export function getOrderId(body: any) {
    return (dispatch: any) => {
        dispatch({
            type: GET_ORDER_MODAL_REQUEST
        });

        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => {
            if (res && res.ok) {
                return res.json()
            }
            return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
        })
        .then(data => {
            dispatch({ type: GET_ORDER_MODAL_SUCCESS, payload: data.order.number })
        })
        .catch(e => {
            dispatch({ type: GET_ORDER_MODAL_FAILED});
            console.log(`Что-то пошло не так ${e}`);
        })
    };
}