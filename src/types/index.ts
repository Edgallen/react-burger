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
};

export type TOrderModal = {
  orderId: number;
  cartId?: Array<string> | number; // исправить!
  isLoading: boolean;
  isFailed: boolean;
  isVisible: boolean;
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

export interface IAuthProvider {
  children: React.ReactNode;
}