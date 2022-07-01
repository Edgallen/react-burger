import React from 'react';
import styles from './feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { TItem } from '../types';

const Images = () => {
  const ingredients = useSelector((store: any) => store.burgerIngredients.ingredients);

  return (
    <div className={styles.orders__images}>
        {ingredients.slice(0, 5).map((ingredient: TItem) => (
          <div className={styles.orders__img__box}>
            <div className={`${styles.orders__img__container} mr-4`}>
              <img 
                src={ingredient.image} 
                className={`${styles.orders__card__img} mr-4`} 
                alt="ingredient_image" 
              />
            </div>
          </div>
        ))}

        {ingredients.length > 4 && (
          <div className={styles.orders__img__box}>
            <div className={styles.orders__count__countainer}>
              <p className='text text_type_main-default'>{`+${ingredients.slice(4, ingredients.length).length}`}</p>
            </div>
            <div className={`${styles.orders__img__container} mr-4`}>
              <img 
                src={ingredients[6].image} 
                className={`${styles.orders__card__img} mr-4`} 
                alt="ingredient_image" 
              />
            </div>
          </div>
        )}
    </div>
  )
}

export const FeedPage = () => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/feed/123131')
  }

  return (
    <section className={`${styles.feed} mt-10`}>
      <div className={styles.orders}>
        <h2 className='text text_type_main-large mb-5'>Лента заказов</h2>
        
        <div className={styles.orders__card__container}>
          <div className={styles.orders__card} onClick={handleOrderClick}>
            <div className={`${styles.orders__info} mt-6`}>
              <h3 className="text text_type_digits-default">#034535</h3>
              <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
            </div>

            <h2 className={`${styles.orders__title} text text_type_main-medium`}>Death Star Starship Main бургер</h2>

            <div className={styles.orders__list}>
              <div>
                <Images />
              </div>

              <div className={styles.orders__price}>
                <h2 className="text text_type_digits-default">480</h2>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
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