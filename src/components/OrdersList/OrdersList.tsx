import React, {FC, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import styles from "./OrdersList.module.css";
import {IOrdersList, TItem, TOrder} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router";
import { openFeedModal } from "../../services/actions/modal";
import { v4 as uuid } from 'uuid';
import { formatDate } from "../../utils/date";

type TImages = {
    order: TOrder;
}

const Images: FC<TImages> = ({order}) => {
    const storeIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);
    const length = order.ingredients.length;
    const slicedImages = order.ingredients.length < 4 ? order.ingredients : order.ingredients.slice(0, 5);

    const getImage = (id: string): string => {
        const ingredientObj = storeIngredients.filter((ingredient: TItem) => ingredient._id === id);
        return ingredientObj[0].image;
    };

    return (
        <>
            {(<div className={styles.orders__images}>
                {slicedImages.map((ingredient: string) => (
                    <div className={styles.orders__img__box} key={uuid()}>
                        <div className={`${styles.orders__img__container} mr-4`}>
                            {ingredient && (
                                <img
                                    src={getImage(ingredient)}
                                    className={`${styles.orders__card__img} mr-4`}
                                    alt="ingredient_image"
                                />
                            )}
                        </div>
                    </div>
                ))}

                {length > 5 && (
                    <div className={styles.orders__img__box}>
                        <div className={styles.orders__count__container}>
                            <p className='text text_type_main-default'>{`+${order.ingredients.slice(5, length).length}`}</p>
                        </div>
                        <div className={`${styles.orders__img__container} mr-4`}>
                            {order.ingredients[5] && (<img
                                src={getImage(order.ingredients[5])}
                                className={`${styles.orders__card__img} mr-4`}
                                alt="ingredient_image"
                            />)}
                        </div>
                    </div>
                )}
            </div>)}
        </>
    )
}

const OrdersList: FC<IOrdersList> = ({type, order}) => {
    const storeIngredients = useAppSelector((store) => store.burgerIngredients.ingredients);
    const [status, setStatus] = useState<'' | 'Выполнен' | 'Готовится' | 'Создан'>('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleOrderClick = () => {
        dispatch(openFeedModal(order));
        type === 'feed' 
        ? navigate(`/feed/${order._id}`, {state: { background: location }}) 
        : navigate(`/profile/orders/${order._id}`, {state: { background: location }});
    };

    const getTotalPrice = (): number | string => {
        let total: number = 0;
        let error: boolean = false;

        if (storeIngredients.length > 0 && order.ingredients.length > 0) {
            order.ingredients.forEach((ingredient: string) => {
                if (ingredient) {
                    total += storeIngredients.filter((storeIngredient: TItem) =>
                    storeIngredient._id === ingredient)[0].price;
                }
                if (!ingredient) {
                    error = true;
                }
            });
        }

        if (error) {
            return 'Ошибка'
        }

        return total;
    };

    const getStatus = (status: string) => {
        switch (status) {
          case 'done': {
            setStatus('Выполнен');
            break;
          }
          case 'pending': {
            setStatus('Готовится');
            break;
          }
          default: {
            setStatus('Создан');
            break;
          }
        }
    };

    useEffect(() => {
        getStatus(order.status);
    }, []);

    return (
        <>
        {storeIngredients.length > 0 && order.ingredients.length > 0 && (
            <div className={styles.orders__card} onClick={handleOrderClick}>
                <div className={`${styles.orders__info}`}>
                    <h3 className="text text_type_digits-default">#{order.number}</h3>
                    <p className="text text_type_main-default text_color_inactive">{formatDate(new Date(order.createdAt))}</p>
                </div>

                <div className={`${styles.orders__title} ${styles.type}`}>
                    <h2 className={`text text_type_main-medium ${type === 'profile' ? 'mb-2': ''}`}>{order.name}</h2>
                    {type === 'profile' && (
                        <p 
                            className={`${status === 'Выполнен' ? styles.orders__text__ready : ''} text text_type_main-default`}
                        >
                            {status}
                        </p>
                    )}
                </div>

                <div className={styles.orders__list}>
                    <div>
                        <Images order={order} />
                    </div>

                    <div className={styles.orders__price}>
                        <h2 className="text text_type_digits-default">{getTotalPrice()}</h2>
                        <CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default OrdersList;