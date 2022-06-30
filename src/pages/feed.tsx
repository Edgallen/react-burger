import React from 'react'
import styles from './feed.module.css';

export const FeedPage = () => {
  return (
    <section className={`${styles.feed} mt-10`}>
      <div className={styles.orders}>

        <h2 className='text text_type_main-large'>Лента заказов</h2>
        <div>

        </div>

      </div>
      <div>

        <div className={styles.info}>
          <div className={styles.stats}>
            <div className={styles.stats_card}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              <div className={styles.stats_list}>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
                <p className={`${styles.stats_list_ready} text text_type_main-medium`}>034533</p>
              </div>
            </div>

            <div className={styles.stats_card}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              <div className={styles.stats_list}>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
                <p className='text text_type_main-medium'>034533</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            <h1 className={`${styles.stats_count} text text_type_digits-large`}>28752</h1>
          </div>

          <div>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <h1 className={`${styles.stats_count} text text_type_digits-large`}>28752</h1>
          </div>
        </div>

      </div>
    </section>
  )
}