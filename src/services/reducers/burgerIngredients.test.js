import { ingredientsReducer as reducer } from "./burgerIngredients";
import * as types from '../constants/burgerIngredientsTypes';
import { ingredientMock } from "../../utils/mocks";

const initialState = {
  ingredients: [],
  isLoading: false,
  isFailed: false
};

describe('burgerIngredients reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.GET_INGREDIENTS_REQUEST })
    ).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('should handle GET_INGREDIENTS_SUCCESS', () => {
    expect(
      reducer(initialState, { type: types.GET_INGREDIENTS_SUCCESS, payload: [ingredientMock] })
    ).toEqual({
      ...initialState,
      ingredients: [ingredientMock],
      isLoading: false,
      isFailed: false
    });
  });

  it('should handle GET_INGREDIENTS_FAILED', () => {
    expect(
      reducer(initialState, { type: types.GET_INGREDIENTS_FAILED })
    ).toEqual({
      ...initialState,
      isFailed: true
    });
  });
});