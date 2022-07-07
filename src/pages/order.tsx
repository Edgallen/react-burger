import React, { useEffect } from 'react';
import styles from './feed.module.css';
import FeedDetails from '../components/FeedDetails/FeedDetails';
import { useParams } from 'react-router';
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import { wsFeedClose, wsFeedInit } from '../services/actions/wsActions';
import { WSUrl } from '../utils/fetchData';
import { TOrder } from '../types';
import { selectFeedIngredient } from '../services/actions/modal';

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const feedMessages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = feedMessages.length;

  useEffect(() => {
    dispatch(wsFeedInit(`${WSUrl}/all`));
    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  useEffect(() => {
    if (length > 0 && length < 2) {
      const orderObj = feedMessages[length - 1].orders.filter((order: TOrder) => order._id === params.id);
      dispatch(selectFeedIngredient(orderObj[0]))
    }
  }, [length])

  return (
    <section className={styles.order}>
      <FeedDetails type='page' />
    </section>
  )
};