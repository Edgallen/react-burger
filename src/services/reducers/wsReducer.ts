import { IFeedWSMessage, IUserWSMessage } from "../../types";
import { TWSActions } from "../actions/wsActions";
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../constants/wsActionTypes";

type TWSState = {
  wsConnected: boolean;
  feedMessages: Array<IFeedWSMessage>;

  error?: boolean;
};

const initialState: TWSState = {
  wsConnected: false,
  feedMessages: []
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS: {
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };
    }
    case WS_FEED_CONNECTION_ERROR: {
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    }
    case WS_FEED_CONNECTION_CLOSED: {
      return {
        ...state,
        error: undefined,
        wsConnected: false,
        feedMessages: []
      };
    }
    case WS_GET_MESSAGE: {
      return {
        ...state,
        error: undefined,
        feedMessages: [...state.feedMessages, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}