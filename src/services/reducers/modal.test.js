import { modalReducer as reducer } from "./modal";
import * as types from '../constants/modalTypes.ts';
import { feedMock, ingredientMock } from "../../utils/mocks";

const initialState = {
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
  },

  feedModal: {
      selectedFeed: {},
      isVisible: false
  }
};

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle CLOSE_MODAL', () => {
    expect(
      reducer(initialState, { type: types.CLOSE_MODAL })
    ).toEqual({
      ...initialState,
      ingredientModal: {...initialState.ingredientModal, isVisible: false},
      orderModal: {...initialState.orderModal, isVisible: false},
      feedModal: {...initialState.feedModal, isVisible: false}
    });
  });

  it('should handle UPDATE_ORDER_MODAL', () => {
    expect(
      reducer(initialState, { type: types.UPDATE_ORDER_MODAL, payload: ['60d3b41abdacab0026a733c7'] })
    ).toEqual({
      ...initialState,
      orderModal: {...initialState.orderModal, cartId: ['60d3b41abdacab0026a733c7']}
    });
  });

  it('should handle OPEN_INGREDIENT_MODAL', () => {
    expect(
      reducer(initialState, { type: types.OPEN_INGREDIENT_MODAL, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      ingredientModal: {
        ...initialState.ingredientModal,
        selectedIngredient: ingredientMock,
        isVisible: true
      }
    });
  });

  it('should handle GET_ORDER_MODAL_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.GET_ORDER_MODAL_REQUEST })
    ).toEqual({
      ...initialState,
      orderModal: {
        ...initialState.orderModal,
        isLoading: true,
        isVisible: true
      },
    });
  });

  it('should handle GET_ORDER_MODAL_SUCCESS', () => {
    expect(
      reducer(initialState, { type: types.GET_ORDER_MODAL_SUCCESS, payload: ['60d3b41abdacab0026a733c7'] })
    ).toEqual({
      ...initialState,
      orderModal: {
        ...initialState.orderModal,
        orderId: ['60d3b41abdacab0026a733c7'],
        isLoading: false,
        isFailed: false,
        isVisible: true,
      }
    });
  });

  it('should handle GET_ORDER_MODAL_FAILED', () => {
    expect(
      reducer(initialState, { type: types.GET_ORDER_MODAL_FAILED })
    ).toEqual({
      ...initialState,
      orderModal: {
        ...initialState.orderModal,
        isFailed: true,
        isVisible: true
      },
    });
  });
  
  it('should handle SELECT_INGREDIENT', () => {
    expect(
      reducer(initialState, { type: types.SELECT_INGREDIENT, payload: ingredientMock })
    ).toEqual({
      ...initialState,
      ingredientModal: {
        ...initialState.ingredientModal,
        selectedIngredient: ingredientMock
      }
    });
  });
  
  it('should handle OPEN_FEED_MODAL', () => {
    expect(
      reducer(initialState, { type: types.OPEN_FEED_MODAL, payload: feedMock })
    ).toEqual({
      ...initialState,
      feedModal: {
        ...initialState.feedModal,
        isVisible: true,
        selectedFeed: feedMock
      }
    });
  });
  
  it('should handle SELECT_FEED_INGREDIENT', () => {
    expect(
      reducer(initialState, { type: types.SELECT_FEED_INGREDIENT, payload: feedMock })
    ).toEqual({
      ...initialState,
      feedModal: {
        ...initialState.feedModal,
        selectedFeed: feedMock
      }
    });
  });
});