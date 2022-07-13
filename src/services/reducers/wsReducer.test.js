import { wsReducer as reducer } from "./wsReducer";
import * as types from '../constants/wsActionTypes.ts';
import { feedMock } from "../../utils/mocks";

const initialState = {
  wsConnected: false,
  feedMessages: [],
  error: false
};

describe('webSockets reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle GET_INGREDIENTS_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.WS_FEED_CONNECTION_SUCCESS })
    ).toEqual({
      ...initialState,
      error: false,
      wsConnected: true
    });
  });

  it('should handle WS_FEED_CONNECTION_ERROR', () => {
    expect(
      reducer(initialState, { type: types.WS_FEED_CONNECTION_ERROR })
    ).toEqual({
      ...initialState,
      error: true,
      wsConnected: false
    });
  });

  it('should handle WS_FEED_CONNECTION_CLOSED', () => {
    expect(
      reducer(initialState, { type: types.WS_FEED_CONNECTION_CLOSED })
    ).toEqual({
      ...initialState,
      error: false,
      wsConnected: false,
      feedMessages: []
    });
  });

  it('should handle WS_GET_MESSAGE', () => {
    expect(
      reducer(initialState, { type: types.WS_GET_MESSAGE, payload: feedMock })
    ).toEqual({
      ...initialState,
      error: false,
      feedMessages: [feedMock]
    });
  });
});