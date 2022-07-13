import { constructorReducer as reducer } from "./burgerConstructor";
import * as types from '../constants/burgerConstructorTypes';
import { bunIngredientMock, ingredientMock } from "../../utils/mocks";

const initialState = {
  cart: [],
  bun: {},
  isLoading: true
};

describe('burgerConstructor reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle ADD_TO_CART', () => {
    expect(
      reducer(initialState, { type: types.ADD_TO_CART, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      cart: [ingredientMock],
      isLoading: false
    });
  });

  it('should handle ADD_BUN', () => {
    expect(
      reducer(initialState, { type: types.ADD_BUN, payload: bunIngredientMock })
    ).toEqual({
      ...initialState,
      bun: bunIngredientMock,
      isLoading: false
    });
  });
  
  it('should handle SET_CART', () => {
    expect(
      reducer(initialState, { type: types.SET_CART, payload: [ingredientMock] })
    ).toEqual({
      ...initialState,
      cart: [ingredientMock]
    });
  });
  
  it('should handle REMOVE_FROM_CART', () => {
    expect(
      reducer(initialState, { type: types.REMOVE_FROM_CART, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      cart: []
    });
  });
  
  it('should handle RESET_CART', () => {
    expect(
      reducer(initialState, { type: types.RESET_CART })
    ).toEqual({
      ...initialState,
      cart: [],
      bun: {},
      isLoading: true
    });
  });
});