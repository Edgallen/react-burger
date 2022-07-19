import React, { useEffect } from 'react';
import styles from './feed.module.css';
import FeedDetails from '../components/FeedDetails/FeedDetails';
import { useNavigate, useParams } from 'react-router';
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import { wsFeedClose, wsFeedInit } from '../services/actions/wsActions';
import { WSUrl } from '../utils/fetchData';
import { TOrder } from '../types';
import { selectFeedIngredient } from '../services/actions/modal';
import { useLocation } from 'react-router';
import { getCookie } from '../utils/cookies';

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const feedMessages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = feedMessages.length;
  const auth = useAppSelector((store) => store.auth.isAuth)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth);
    console.log(length > 0);
    if (location.pathname.slice(1, 5) === 'feed') {
      dispatch(wsFeedInit(`${WSUrl}/all`));
    }

    if (location.pathname.slice(1, 8) === 'profile') {
      !auth ? dispatch(wsFeedInit(`${WSUrl}?token=${getCookie('token')}`)) : navigate('/login', { replace: true });
    }

    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  // useEffect(() => {
  //   if(length) {
  //     if (length > 0 && length < 2) {
  //       console.log(feedMessages);
  //       const orderObj = feedMessages[length - 1].orders.filter((order: TOrder) => order._id === params.id);
  //       dispatch(selectFeedIngredient(orderObj[0]));
  //     }
  //   }
  // }, [length])

  return (
    <section className={styles.order}>
      <FeedDetails type='page' />
    </section>
  )
};