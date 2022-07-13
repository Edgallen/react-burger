import { authReducer as reducer } from "./auth";
import * as types from '../constants/authTypes';

const initialState = {
  isAuth: false,
  authFailed: false,
  isForgot: false,
  recoveryRequest: false,
  recoverIsFailed: false,
  user: {}
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });

  it('should handle SIGN_IN_USER', () => {
    expect(
      reducer(initialState, 
          { type: types.SIGN_IN_USER, payload: { email: 'testEmail@yandex.ru', name: 'testName' }}
        )
    ).toEqual({
      ...initialState,
      isAuth: true,
      authFailed: false,
      user: {
        email: 'testEmail@yandex.ru',
        name: 'testName'
      }
    });
  });

  it('should handle SIGN_OUT_USER', () => {
    expect(
      reducer(initialState, { type: types.SIGN_OUT_USER })
    ).toEqual({
      ...initialState,
      isAuth: false,
      authFailed: false
    });
  });

  it('should handle REGISTER_USER_SUCCESS', () => {
    expect(
      reducer(initialState, { type: types.REGISTER_USER_SUCCESS })
    ).toEqual({
      ...initialState,
      isAuth: true,
      authFailed: false
    });
  });

  it('should handle REGISTER_USER_FAILED', () => {
    expect(
      reducer(initialState, { type: types.REGISTER_USER_FAILED })
    ).toEqual({
      ...initialState,
      authFailed: true
    });
  });

  it('should handle RECOVERY_REQUEST', () => {
    expect(
      reducer(initialState, { type: types.RECOVERY_REQUEST })
    ).toEqual({
      ...initialState,
      isForgot: true
    });
  });

  it('should handle RECOVERY_SUCCESS', () => {
    expect(
      reducer(initialState, { type: types.RECOVERY_SUCCESS })
    ).toEqual({
      ...initialState,
      recoveryRequest: true,
      recoverIsFailed: false
    });
  });

  it('should handle RECOVERY_FAILED', () => {
    expect(
      reducer(initialState, { type: types.RECOVERY_FAILED })
    ).toEqual({
      ...initialState,
      recoverIsFailed: true
    });
  });

  it('should handle SET_USER', () => {
    expect(
      reducer(initialState, 
            {type: types.SET_USER, payload: {
              success: true,
              user: {
                email: 'testEmail@yandex.ru',
                name: 'testName'
              }
            }
          }
        )
    ).toEqual({
      ...initialState,
      isAuth: true,
      user: {
        email: 'testEmail@yandex.ru',
        name: 'testName'
      }
    });
  });
});