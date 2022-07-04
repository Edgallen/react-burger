import React, {FC} from "react";
import {useSelector} from "react-redux";
import styles from "./OrdersList.module.css";
import {IOrdersList, TItem} from "../../types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useNavigate} from "react-router";

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
                    <div className={styles.orders__count__container}>
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

const OrdersList: FC<IOrdersList> = ({type, order}) => {
    const navigate = useNavigate();

    const handleOrderClick = () => {
        type === 'feed' ? navigate(`/feed/${order._id}`) : navigate('/profile/123131');
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
                    <Images />
                </div>

                <div className={styles.orders__price}>
                    <h2 className="text text_type_digits-default">480</h2>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    )
}

export default OrdersList;