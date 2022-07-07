import { Middleware, MiddlewareAPI } from "redux";
import { TWSActions } from "../actions/wsActions";
import { AppDispatchActions, RootState } from "../types";

export const socketMiddleware = (wsActions: any): Middleware => {
  return ((store: MiddlewareAPI<AppDispatchActions, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const {dispatch} = store;
      const {type} = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsClose } = wsActions;

      if (type === wsInit) {
        //@ts-ignore
        socket = new WebSocket(action.payload);
      }

      if (socket && type === wsClose) {
        socket.close();
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = () => {
          socket = null;
          dispatch({ type: onClose });
        };
      }

      next(action);
    };
  }) as Middleware;
}