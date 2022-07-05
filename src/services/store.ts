import { compose } from "redux";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./middleware";
import { 
    WS_FEED_CONNECTION_CLOSE,
    WS_FEED_CONNECTION_CLOSED,
    WS_FEED_CONNECTION_ERROR,
    WS_FEED_CONNECTION_START,
    WS_FEED_CONNECTION_SUCCESS,
    WS_FEED_GET_MESSAGE,
    WS_PROFILE_CONNECTION_CLOSE,
    WS_PROFILE_CONNECTION_CLOSED,
    WS_PROFILE_CONNECTION_ERROR,
    WS_PROFILE_CONNECTION_START,
    WS_PROFILE_CONNECTION_SUCCESS,
    WS_PROFILE_GET_MESSAGE
} from "./constants/wsActionTypes";

export const composeEnhancers =
    // @ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const wsFeedActions = {
    wsInit: WS_FEED_CONNECTION_START,
    onOpen: WS_FEED_CONNECTION_SUCCESS,
    onClose: WS_FEED_CONNECTION_CLOSED,
    onError: WS_FEED_CONNECTION_ERROR,
    onMessage: WS_FEED_GET_MESSAGE,
    wsClose: WS_FEED_CONNECTION_CLOSE
}

const wsProfileActions = {
    wsInit: WS_PROFILE_CONNECTION_START,
    onOpen: WS_PROFILE_CONNECTION_SUCCESS,
    onClose: WS_PROFILE_CONNECTION_CLOSED,
    onError: WS_PROFILE_CONNECTION_ERROR,
    onMessage: WS_PROFILE_GET_MESSAGE,
    wsClose: WS_PROFILE_CONNECTION_CLOSE
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(wsFeedActions), socketMiddleware(wsProfileActions))
});