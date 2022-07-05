import React from 'react';
import styles from './feed.module.css';
import FeedDetails from '../components/FeedDetails/FeedDetails';

export const OrderPage = () => {
  return (
    <section className={styles.order}>
      <FeedDetails type='page' />
    </section>
  )
};