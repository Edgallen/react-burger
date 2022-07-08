export const baseUrl = 'https://norma.nomoreparties.space/api';
export const WSUrl = 'wss://norma.nomoreparties.space/orders';

export const checkResponse = (res: Response) => {
   if (res && res.ok) {
      return res.json()
  }
  return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
};