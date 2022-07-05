import { IFeedWSMessage } from '../../types';
import {
  WS_FEED_CONNECTION_CLOSE,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_PROFILE_CONNECTION_CLOSE,
  WS_PROFILE_CONNECTION_CLOSED,
  WS_PROFILE_CONNECTION_ERROR,
  WS_PROFILE_CONNECTION_START,
  WS_PROFILE_CONNECTION_SUCCESS,
  WS_PROFILE_GET_MESSAGE
} from '../constants/wsActionTypes'

interface IWSFeedConnectionStart {
  readonly type: typeof WS_FEED_CONNECTION_START;
  readonly payload: string;
}

interface IWSFeedConnectionClose {
  readonly type: typeof WS_FEED_CONNECTION_CLOSE;
}

interface IWSFeedConnectionSuccess {
  readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
}

interface IWSFeedConnectionError {
  readonly type: typeof WS_FEED_CONNECTION_ERROR;
}

interface IWSFeedConnectionClosed {
  readonly type: typeof WS_FEED_CONNECTION_CLOSED;
}

interface IWSFeedGetMessage {
  readonly type: typeof WS_FEED_GET_MESSAGE;
  readonly payload: IFeedWSMessage;
}

interface IWSProfileConnectionStart {
  readonly type: typeof WS_PROFILE_CONNECTION_START;
  readonly payload: string;
}

interface IWSProfileConnectionClose {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSE;
}

interface IWSProfileConnectionSuccess {
  readonly type: typeof WS_PROFILE_CONNECTION_SUCCESS;
}

interface IWSProfileConnectionError {
  readonly type: typeof WS_PROFILE_CONNECTION_ERROR;
}

interface IWSProfileConnectionClosed {
  readonly type: typeof WS_PROFILE_CONNECTION_CLOSED;
}

interface IWSProfileGetMessage {
  readonly type: typeof WS_PROFILE_GET_MESSAGE;
  readonly payload: IFeedWSMessage;
}

export type TWSActions = 
  | IWSFeedConnectionStart
  | IWSFeedConnectionClose
  | IWSFeedConnectionSuccess
  | IWSFeedConnectionError
  | IWSFeedConnectionClosed
  | IWSFeedGetMessage
  | IWSProfileConnectionStart
  | IWSProfileConnectionClose
  | IWSProfileConnectionSuccess
  | IWSProfileConnectionError
  | IWSProfileConnectionClosed
  | IWSProfileGetMessage;

export const wsFeedInit = (url: string): IWSFeedConnectionStart => {
  return {
    type: WS_FEED_CONNECTION_START,
    payload: url
  };
}

export const wsFeedClose = (): IWSFeedConnectionClose => {
  return {
    type: WS_FEED_CONNECTION_CLOSE
  };
}

export const wsFeedSuccess = (): IWSFeedConnectionSuccess => {
  return {
    type: WS_FEED_CONNECTION_SUCCESS
  };
}

export const wsFeedError = (): IWSFeedConnectionError => {
  return {
    type: WS_FEED_CONNECTION_ERROR
  };
}

export const wsFeedClosed = (): IWSFeedConnectionClosed => {
  return {
    type: WS_FEED_CONNECTION_CLOSED
  };
}

export const wsFeedGetMessage = (message: IFeedWSMessage): IWSFeedGetMessage => {
  return {
    type: WS_FEED_GET_MESSAGE,
    payload: message
  };
}

export const wsProfileInit = (url: string): IWSProfileConnectionStart => {
  return {
    type: WS_PROFILE_CONNECTION_START,
    payload: url
  };
}

export const wsProfileClose = (): IWSProfileConnectionClose => {
  return {
    type: WS_PROFILE_CONNECTION_CLOSE
  };
}

export const wsProfileSuccess = (): IWSProfileConnectionSuccess => {
  return {
    type: WS_PROFILE_CONNECTION_SUCCESS
  };
}

export const wsProfileError = (): IWSProfileConnectionError => {
  return {
    type: WS_PROFILE_CONNECTION_ERROR
  };
}

export const wsProfileClosed = (): IWSProfileConnectionClosed => {
  return {
    type: WS_PROFILE_CONNECTION_CLOSED
  };
}

export const wsProfileGetMessage = (message: IFeedWSMessage): IWSProfileGetMessage => {
  return {
    type: WS_PROFILE_GET_MESSAGE,
    payload: message
  };
}