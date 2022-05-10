export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredients() {
    return (dispatch: any) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetch('https://norma.nomoreparties.space/api/ingredients')
            .then((res) => {
                if (res && res.ok) {
                    return res.json()
                }
                return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
            })
            .then((data) => {
                dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: data.data})
            })
            .catch(e => {
                dispatch({ type: GET_INGREDIENTS_FAILED })
                console.log(`Что-то пошло не так ${e}`);
            })
    };
}