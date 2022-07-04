import { TItem } from "../../types";
import {
  ADD_BUN,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  SET_CART,
} from "../constants/burgerConstructorTypes";

export interface IAddToCart {
  readonly type: typeof ADD_TO_CART;
  readonly payload: TItem;
};

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  readonly payload: TItem;
};

export interface ISetCart {
  readonly type: typeof SET_CART;
  readonly payload: Array<TItem>;
};

export interface IRemoveFromCart {
  readonly type: typeof REMOVE_FROM_CART;
  readonly payload: number;
};

export interface IResetCart {
  readonly type: typeof RESET_CART;
};

export type TBurgerConstructorActions =
  | IAddToCart
  | IAddBun
  | ISetCart
  | IRemoveFromCart
  | IResetCart;

export const addToCart = (item: TItem, uuid: string): IAddToCart => {
  return {
    type: ADD_TO_CART,
    payload: {...item, id: uuid},
  };
};

export const addBun = (item: TItem): IAddBun => {
  return {
    type: ADD_BUN,
    payload: item,
  };
};

export const setCart = (newCart: Array<TItem>): ISetCart => {
  return {
    type: SET_CART,
    payload: newCart
  };
};

export const removeFromCart = (index: number): IRemoveFromCart => {
  return {
    type: REMOVE_FROM_CART,
    payload: index
  };
};

export const resetCart = (): IResetCart => {
  return {
    type: RESET_CART
  };
};