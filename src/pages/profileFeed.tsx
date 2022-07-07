import React, { useEffect } from 'react';
import styles from './pages.module.css';
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import OrdersList from '../components/OrdersList/OrdersList'
import { wsFeedClose, wsFeedInit } from '../services/actions/wsActions';
import { TOrder } from '../types';
import { WSUrl } from '../utils/fetchData';
import { getCookie } from '../utils/cookies';
import { Outlet } from 'react-router';
import { v4 as uuid } from 'uuid';

export const ProfileFeedPage = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = messages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSUrl}?token=${getCookie('token')}`));
    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  return (
    <>
      {length > 0
        ? (
          <>
            {messages[length - 1].orders.length > 0
              ?(<div className={`${styles.profile_feed_container} mr-2`}>
                {messages[length - 1].orders.map((order: TOrder) => (
                  <OrdersList type='profile' order={order} key={uuid()} />
                ))}
                <Outlet />
              </div>)
              : <h1 className={`${styles.profile_feed_loading} text text_type_main-medium text_color_inactive`}>Вы еще не сделали заказов</h1>
            }
          </>
        )
        : <h1 className={`${styles.profile_feed_loading} text text_type_main-medium text_color_inactive`}>Загрузка...</h1>
      }
    </>
  )
}
