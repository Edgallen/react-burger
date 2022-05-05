import React from "react"

import DoneTick from '../../images/graphics.svg'
import styles from './OrderDetails.module.css'
import PropTypes from "prop-types";

const OrderDetails = ({ orderModal }) => {
    return (
        <div className={styles.module__container}>
            {!orderModal.isLoading && !orderModal.hasError && <h1 className={styles.module__id + " text text_type_digits-large mt-6"}>{orderModal.responseId}</h1>}
            <p className="text text_type_main-medium mt-8" >идентификатор заказа</p>

            <div className={styles.module__img + ' mt-15 mb-15'}>
                <img className="m-2" src={DoneTick} alt="Done tick" />
            </div>

            <p className="text text_type_main-default mb-2" >Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive mb-30" >Дождитесь готовности на орбитальной станции</p>
        </div>
    );
};

OrderDetails.propTypes = {
    orderModal: PropTypes.shape({
        isVisible: PropTypes.bool.isRequired,
        responseId: PropTypes.number.isRequired,
        idHasError: PropTypes.bool.isRequired,
        idIsLoading: PropTypes.bool.isRequired
    }).isRequired
}

export default OrderDetails;