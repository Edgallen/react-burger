import React from 'react';
import styles from './feed.module.css';
import OrdersList from "../components/OrdersList/OrdersList";

export const FeedPage = () => {

  return (
    <section className={`${styles.feed} mt-10`}>

      <div className={styles.orders}>
        <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
        <div className={styles.orders__container}>
          <OrdersList type='feed' />
        </div>
      </div>

      <div>

        <div className={styles.info}>
          <div className={styles.stats}>
            <div className={styles.stats__card}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <div className={styles.stats__list}>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
                <p className={`${styles.stats__list__ready} text text_type_digits-default`}>034533</p>
              </div>
            </div>

            <div className={styles.stats__card}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <div className={styles.stats__list}>
                <p className="text text_type_digits-default">034533</p>
                <p className="text text_type_digits-default">034533</p>
                <p className="text text_type_digits-default">034533</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            <h1 className={`${styles.stats__count} text text_type_digits-large`}>28752</h1>
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <h1 className={`${styles.stats__count} text text_type_digits-large`}>28752</h1>
          </div>
        </div>

      </div>
    </section>
  )
}