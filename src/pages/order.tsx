import React from 'react';
import styles from './feed.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from 'react-redux';
import { TItem } from '../types';

const IngredientList = () => {
  const ingredients = useSelector((store: any) => store.burgerIngredients.ingredients);
  
  return (
    <>
      {ingredients.map((ingredient: TItem) => (
        <div className={styles.order__card} >
          <div className={styles.order__card__title}>
            <div className={`${styles.order__img__container} mr-4`}>
              <img 
                src={ingredient.image} 
                className={`${styles.order__card__img} mr-4`} 
                alt="ingredient_image" 
              />
            </div>
            <p className='text text_type_main-default'>{ingredient.name}</p>
          </div>

          <div className={styles.order__price}>
            <h2 className="text text_type_digits-default">{ingredient.price}</h2>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      ))}
    </>
  )
};

export const OrderPage = () => {
  return (
    <section className={styles.order}>
      <h2 className="text text_type_digits-default mb-10">#034533</h2>

      <div className={styles.order__details}>
        <h1 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h1>
        <p className={`${styles.order__status} text text_type_main-default mb-15`}>Выполнен</p>
      </div>

      <h1 className={`${styles.order__details} text text_type_main-medium mb-6`}>Состав:</h1>

      <div className={`${styles.order__container} mb-10`} >
        
        <IngredientList />
        
      </div>

      <div className={styles.order__info}>
        <p className={`${styles.order__time} text text_type_main-default`}>Вчера, 13:50 i-GMT+3</p>

        <div className={styles.order__price}>
          <h2 className="text text_type_digits-default">480</h2>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </section>
  )
};