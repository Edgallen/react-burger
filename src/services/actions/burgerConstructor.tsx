export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_BUN = 'ADD_BUN';
export const SET_CART = 'SET_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const RESET_CART = 'RESET_CART';

export const addToCart = (item: any, uuid: any) => {
  return {
    type: ADD_TO_CART,
    payload: {...item, id: uuid},
  };
};

export const addBun = (item: any) => {
  return {
    type: ADD_BUN,
    payload: item,
  };
};

export const setCart = (newCart: any) => {
  return {
    type: SET_CART,
    payload: newCart
  };
};

export const removeFromCart = (index: any) => {
  return {
    type: REMOVE_FROM_CART,
    payload: index
  };
};

export const resetCart = () => {
  return {
    type: RESET_CART
  };
};