import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types";

export const socketMiddleware = (wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: any) => {
      const {dispatch} = store;
      const {type} = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(action.payload);
      }

      if (socket && type === wsClose) {
        socket.close();
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  }) as Middleware;
}