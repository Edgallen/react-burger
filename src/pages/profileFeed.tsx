import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrdersList from '../components/OrdersList/OrdersList'
import { wsProfileClose, wsProfileInit } from '../services/actions/wsActions';
import { TOrder } from '../types';
import { WSUrl } from '../utils/fetchData';
import { getCookie } from '../utils/cookies';

export const ProfileFeedPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((store: any) => store.webSocket.userMessages);
  const length = messages.length;

  useEffect(() => {
    dispatch(wsProfileInit(`${WSUrl}?token=${getCookie('token')}`));
    return () => {
      dispatch(wsProfileClose());
    }
  }, [dispatch]);

  return (
    <>
      {length > 0 && (
        messages[length - 1].orders.map((order: TOrder) => (
          <OrdersList type='profile' order={order} />
        ))
      )}
    </>
  )
}
