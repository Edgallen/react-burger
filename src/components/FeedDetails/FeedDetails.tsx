import React, {FC, useEffect, useState} from 'react';
import styles from './FeedDetails.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppSelector} from "../../utils/hooks";
import { TItem } from '../../types';
import { v4 as uuid } from 'uuid';
import { TFeedDetails } from '../../services/types/data';
import { formatDate } from '../../utils/date';

type TIngredientList = {
  feedIngredients: Array<string>;
}

type TAmount = {
  [key: string]: number
}

const IngredientList: FC<TIngredientList> = ({feedIngredients}) => {
  const storeIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const [ingredients, setIngredients] = useState<Array<TItem> | []>([]);
  const [amount, setAmount] = useState<TAmount>({})

  useEffect(() => {
    const newIngredientsArr: Array<TItem> = getIngredients(feedIngredients);
    const uniqeIngredientsArr: Array<TItem> = deleteDuplicates(newIngredientsArr);

    countAmount(newIngredientsArr);
    setIngredients(uniqeIngredientsArr);
  }, []);

  const getIngredients = (arr: Array<string>) => {
    const ingredientsArr: Array<TItem> = []

    arr.forEach((ingredient: string) => {
      const ingredientObj: Array<TItem> = storeIngredients.filter((storeIngredient: TItem) => 
        storeIngredient._id === ingredient
      );

      ingredientsArr.push(ingredientObj[0]);
    });

    return ingredientsArr;
  };

  const deleteDuplicates = (arr: Array<TItem>) => {
    const uniqeIngredientsArr = arr.filter(function(item, index) {
      return arr.indexOf(item) === index;
    });
    return uniqeIngredientsArr;
  }

  const countAmount = (arr: Array<TItem>) => {
    const counts: TAmount = {};
    arr.forEach(function (x, index) {
      counts[x._id] = (counts[x._id] || 0) + 1;
    });
    setAmount(counts);
  };
  
  return (
    <>
      {ingredients.map((storeIngredient: TItem, index: number) => (
        <div className={styles.order__card} key={uuid()}>
          <div className={styles.order__card__title}>
            <div className={`${styles.order__img__container} mr-4`}>
              <img 
                src={storeIngredient.image} 
                className={`${styles.order__card__img} mr-4`} 
                alt="ingredient_image" 
              />
            </div>
            <p className='text text_type_main-default'>{storeIngredient.name}</p>
          </div>

          <div className={styles.order__price}>
            <h2 className="text text_type_digits-default">{amount[storeIngredient._id]} x </h2>
            <h2 className="text text_type_digits-default">{storeIngredient.price}</h2>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      ))}
    </>
  )
};

const FeedDetails: FC<TFeedDetails> = ({type}) => {
  const storeIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);
  const feed = useAppSelector((store: any) => store.modal.feedModal.selectedFeed);

  const getStatus = (status: string): string => {
    switch (status) {
      case 'done': {
        return 'Выполнен';
      }
      case 'pending': {
        return 'Готовится';
      }
      default: {
        return 'Создан';
      }
    }
  };

  const getTotalPrice = (): number => {
    let total: number = 0;

    feed.ingredients.forEach((ingredient: string) => {
        total += storeIngredients.filter((storeIngredient: TItem) => storeIngredient._id === ingredient)[0].price;
    })

    return total;
};

  return (
    <>
      {feed.ingredients 
        ? (
          <div className={`${styles.order} ${type === 'modal' ? 'ml-10' : ''} mb-10`}>
            <h2 className={`text text_type_digits-default mb-10 ${type === 'page' ? styles.text_center : ''}`}>#{feed.number}</h2>

            <div className={styles.order__details}>
              <h1 className="text text_type_main-medium mb-3">{feed.name}</h1>
              <p className={`${feed.status === 'done' ? styles.order__ready : styles.order__status} text text_type_main-default mb-15`}>{getStatus(feed.status)}</p>
            </div>

            <h1 className={`${styles.order__details} text text_type_main-medium mb-6`}>Состав:</h1>

            <div className={`${styles.order__container} mb-10 pt-2 pb-2`} > 
              <IngredientList feedIngredients={feed.ingredients} />
            </div>

            <div className={styles.order__info}>
              <p className={`${styles.order__ready} text text_type_main-default`}>{formatDate(new Date(feed.createdAt))}</p>

              <div className={styles.order__price}>
                <h2 className="text text_type_digits-default">{getTotalPrice()}</h2>
                <CurrencyIcon type="primary"/>
              </div>
            </div>
          </div>
        )
        : <h1 className={`${styles.order_loading} text text_type_main-large text_color_inactive`}>Загрузка...</h1>
      }
    </>
  )
}

export default FeedDetails;
