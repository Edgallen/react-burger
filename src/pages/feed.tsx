import React, { useEffect } from 'react';
import styles from './feed.module.css';
import OrdersList from "../components/OrdersList/OrdersList";
import { useDispatch, useSelector } from 'react-redux';
import { wsFeedInit, wsFeedClose } from '../services/actions/wsActions';
import { WSUrl } from '../utils/fetchData';
import { TOrder } from '../types'
import { RootState } from '../services/types';
import { Outlet } from "react-router-dom";

export const FeedPage = () => {
  const dispatch = useDispatch();
  const messages = useSelector((store: RootState) => store.webSocket.feedMessages);
  const length = messages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSUrl}/all`));
    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch])

  return (
    <>
    <section className={`${styles.feed} mt-10`}>

      <div className={styles.orders}>
        <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
        <div className={styles.orders__container}>
          {length > 0 && (
            messages[length - 1].orders.map((order: TOrder) => (
              <OrdersList type='feed' order={order} />
            ))
          )}
        </div>
      </div>

      <div>

        <div className={styles.info}>
          <div className={styles.stats}>
            <div className={styles.stats__card}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <div className={styles.stats__list}>
                {length > 0 && (
                  messages[length - 1].orders.map((order: TOrder) => (
                    order.status === 'done' && <p className={`${styles.stats__list__ready} text text_type_digits-default`}>#{order.number}</p>
                  ))
                )}
              </div>
            </div>

            <div className={styles.stats__card}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <div className={styles.stats__list}>
                {length > 0 && (
                  messages[length - 1].orders.map((order: TOrder) => (
                    order.status === 'pending' && <p className="text text_type_digits-default">#{order.number}</p>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            {length > 0 && (
              <h1 className={`${styles.stats__count} text text_type_digits-large`}>{messages[length - 1].total}</h1>
            )}
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            {length > 0 && (
              <h1 className={`${styles.stats__count} text text_type_digits-large`}>{messages[length - 1].totalToday}</h1>
            )}
          </div>
        </div>

      </div>
    </section>
    <Outlet />
    </>
  )
}