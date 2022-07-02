import {TUser} from "../services/types/data";

export type TItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  id?: string;
};

export type TBurgerConstructor = {
  cart: Array<TItem>;
  bun: TItem;
  isLoading: boolean;
}

export interface IMenuIngredient {
  ingredient: TItem;
}

export interface IMenu {
  menu: Array<TItem>;
}

export interface IModal {
  children: React.ReactNode;
  headerTitle?: string | boolean;
  closeHandler: () => void;
}

export interface IModalOverlay {
  closeModal: () => void;
}

export interface IBunConstructor {
  position: 'top' | 'bottom';
  positionText: '(верх)' | '(низ)';
  bun: TItem;
}

export interface IConstructorElements {
  ingredient: TItem;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface IIngredientsConstructor {
  state: TBurgerConstructor;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export type TAuthBody = {
  [key: string]: string | undefined
}

export type TAuth = {
  isAuth: boolean;
  logIn: (body: TAuthBody) => void;
  logOut: (body: TAuthBody) => void;
} | null

export interface IAppContextInterface {
  isAuth: boolean;
  logIn: (body: TAuthBody) => void;
  logOut: (body: TAuthBody) => void;
}

export interface IAuthProvider {
  children: React.ReactNode;
}

export interface IOrdersList {
  type: 'feed' | 'profile';
}

export interface IProfileInputs {
  user: TUser;
}