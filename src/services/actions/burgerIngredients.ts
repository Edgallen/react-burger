import { TItem } from '../../types';
import { baseUrl, checkResponse } from '../../utils/fetchData';
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
} from '../constants/burgerIngredientsTypes';
import { AppDispatch, AppThunk } from '../types';
import { TIngredientsResponse } from '../types/data';

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly payload: Array<TItem>;
};

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
};

export type TBurgerIngredientsActions = 
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed;

export const getIngredientsRequest = (): IGetIngredientsRequest => {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
};

export const getIngredientsSuccess = (data: TIngredientsResponse): IGetIngredientsSuccess => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        payload: data.data
    }
};

export const getIngredientsFailed = (): IGetIngredientsFailed => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
};

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequest());

    fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        .then((data) => {
            dispatch(getIngredientsSuccess(data))
        })
        .catch(e => {
            dispatch(getIngredientsFailed())
            console.log(`Что-то пошло не так ${e}`);
        })
}