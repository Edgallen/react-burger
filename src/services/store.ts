import { compose } from "redux";
import { rootReducer } from "./reducers";
import {configureStore} from "@reduxjs/toolkit";

export const composeEnhancers =
    // @ts-ignore
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        // @ts-ignore
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

export const store = configureStore({
    reducer: rootReducer
});