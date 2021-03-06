import {combineReducers} from "redux";
import { ingredientsReducer } from './burgerIngredients';
import {constructorReducer} from "./burgerConstructor";
import {modalReducer} from "./modal";
import {authReducer} from "./auth";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
   burgerIngredients: ingredientsReducer,
   burgerConstructor: constructorReducer,
   modal: modalReducer,
   auth: authReducer,
   webSocket: wsReducer,
});