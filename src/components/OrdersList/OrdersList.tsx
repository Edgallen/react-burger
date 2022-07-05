import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./OrdersList.module.css";
import {IOrdersList, TItem, TOrder} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useLocation, useNavigate} from "react-router";
import { openFeedModal } from "../../services/actions/modal";

type TImages = {
    order: TOrder;
}

const Images: FC<TImages> = ({order}) => {
    const storeIngredients = useSelector((store: any) => store.burgerIngredients.ingredients);
    const length = order.ingredients.length;
    const slicedImages = order.ingredients.length < 4 ? order.ingredients : order.ingredients.slice(0, 5);

    const getImage = (id: string): string => {
        const ingredientObj = storeIngredients.filter((ingredient: TItem) => ingredient._id === id);
        return ingredientObj[0].image
    };

    return (
        <div className={styles.orders__images}>
            {slicedImages.map((ingredient: string) => (
                <div className={styles.orders__img__box}>
                    <div className={`${styles.orders__img__container} mr-4`}>
                        <img
                            src={getImage(ingredient)}
                            className={`${styles.orders__card__img} mr-4`}
                            alt="ingredient_image"
                        />
                    </div>
                </div>
            ))}

            {length > 6 && (
                <div className={styles.orders__img__box}>
                    <div className={styles.orders__count__container}>
                        <p className='text text_type_main-default'>{`+${order.ingredients.slice(6, length).length}`}</p>
                    </div>
                    <div className={`${styles.orders__img__container} mr-4`}>
                        <img
                            src={getImage(order.ingredients[5])}
                            className={`${styles.orders__card__img} mr-4`}
                            alt="ingredient_image"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

const OrdersList: FC<IOrdersList> = ({type, order}) => {
    const storeIngredients = useSelector((store: any) => store.burgerIngredients.ingredients);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleOrderClick = () => {
        // type === 'feed' ? navigate(`/feed/${order._id}`) : navigate('/profile/123131');
        dispatch(openFeedModal(order));
        navigate(`/feed/${order._id}`, {state: { background: location }});
    };

    const getTotalPrice = (): number => {
        let total: number = 0;

        order.ingredients.forEach((ingredient: string) => {
            total += storeIngredients.filter((storeIngredient: TItem) => storeIngredient._id === ingredient)[0].price;
        })

        return total;
    };

    return (
        <div className={styles.orders__card} onClick={handleOrderClick}>
            <div className={`${styles.orders__info}`}>
                <h3 className="text text_type_digits-default">#{order.number}</h3>
                <p className="text text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</p>
            </div>

            <div className={`${styles.orders__title} ${styles.type}`}>
                <h2 className={`text text_type_main-medium ${type === 'profile' ? 'mb-2': ''}`}>{order.name}</h2>
                {type === 'profile' && <p className={`${styles.orders__status} text text_type_main-default`}>Создан</p>}
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
    )
}

export default OrdersList;