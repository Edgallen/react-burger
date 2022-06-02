import { baseUrl, checkResponse } from '../../utils/fetchData';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const getIngredientsSuccess = (data: any) => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
    }
};

export const getIngredientsFailed = () => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
};

export function getIngredients() {
    return (dispatch: any) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });

        fetch(`${baseUrl}/ingredients`)
            .then(checkResponse)
            .then((data) => {
                dispatch(getIngredientsSuccess(data))
            })
            .catch(e => {
                dispatch(getIngredientsFailed())
                console.log(`Что-то пошло не так ${e}`);
            })
    };
}