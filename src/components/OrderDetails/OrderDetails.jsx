import React from "react"

import DoneTick from '../../images/graphics.svg'
import styles from './OrderDetails.module.css'

const OrderDetails = () => {
    return (
        <div className={styles.module__container}>
            <h1 className={styles.module__id +" text text_type_digits-large mt-6"}>12323</h1>
            <p className="text text_type_main-medium mt-8" >идентификатор заказа</p>

            <div className={styles.module__img + ' mt-15 mb-15'}>
                <img className="m-2" src={DoneTick} alt="Done tick" />
            </div>

            <p className="text text_type_main-default mb-2" >Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-30" >Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

export default OrderDetails;