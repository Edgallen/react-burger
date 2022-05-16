import {combineReducers} from "redux";
import { ingredientsReducer } from './burgerIngredients';
import {constructorReducer} from "./burgerConstructor";
import {modalReducer} from "./modal";

export const rootReducer = combineReducers({
   burgerIngredients: ingredientsReducer,
   burgerConstructor: constructorReducer,
   modal: modalReducer,
});