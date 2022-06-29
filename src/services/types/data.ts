import { TItem } from "../../types";

export type TUser = {
  email: string;
  name: number;
};

export type TChangeUser = {
  success: boolean;
  user: TUser;
};

export type TIngredientsResponse = {
  success: boolean,
  data: Array<TItem>
};

export type TModalResponse = {
  success: boolean;
  name: string;
  order: {
    number: number
  };
}