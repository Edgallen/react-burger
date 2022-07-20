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
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const OrderPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const feedMessages = useAppSelector((store) => store.webSocket.feedMessages);
  const length = feedMessages.length;
  const auth = useAppSelector((store) => store.auth.isAuth)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.slice(1, 5) === 'feed') {
      dispatch(wsFeedInit(`${WSUrl}/all`));
    }

    if (location.pathname.slice(1, 8) === 'profile') {
      dispatch(wsFeedInit(`${WSUrl}?token=${getCookie('token')}`));
    }

    return () => {
      dispatch(wsFeedClose());
    }
  }, [dispatch]);

  useEffect(() => {
    const check = location.pathname.slice(1, 8) === 'profile' && !auth;

    if(!check) {
      if (length > 0 && length < 2) {
        const orderObj = feedMessages[length - 1].orders.filter((order: TOrder) => order._id === params.id);
        dispatch(selectFeedIngredient(orderObj[0]));
      }
    }
  }, [feedMessages]);

  const returnHomeClick = () => {
    navigate('/login');
  };

  return (
    <section className={styles.order}>
      {location.pathname.slice(1, 8) === 'profile' && !auth
      ? (
        <div className={styles.order__notAuthorized}>
          <h1 className="text text_type_main-medium text_color_inactive">Нужно авторизироваться</h1>
          <Button onClick={returnHomeClick}>
            Авторизоваться
          </Button>
        </div>
      ) 
      : (<FeedDetails type='page' />)
    }
    </section>
  )
};