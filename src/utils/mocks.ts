import { TItem, TOrder } from "../types";

export const bunIngredientMock: TItem = {
  _id: "60d3b41abdacab0026a733c6",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0
}

export const ingredientMock: TItem = {
  _id: "60d3b41abdacab0026a733cb",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0
}

export const feedMock: TOrder = {
  _id: "62ce92f042d34a001c276ea3",
  ingredients: [
    "60d3b41abdacab0026a733cf",
    "60d3b41abdacab0026a733cd",
    "60d3b41abdacab0026a733ce"
  ],
  status: "done",
  name: "Space антарианский традиционный-галактический бургер",
  createdAt: "2022-07-13T09:40:00.764Z",
  updatedAt: "2022-07-13T09:40:01.130Z",
  number: 20015
}