import { TItem } from "../../types";

export type TUser = {
  email: string;
  name: string;
};

export type TUserEmpty= {
  email?: string;
  name?: string;
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

export type TFeedDetails = {
  type: 'modal' | 'page';
}