import React, {useMemo} from "react";
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/dataPropTypes';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, getOrderId} from "../../services/actions/modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

const ConstructorElements = ({text, price, thumbnail}) => {
    return (
        <li className={styles.constructor__card}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </li>
    );
};

ConstructorElements.propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired
};

const BunConstructor = ({position, positionText, bun}) => {
    return (
        <div className={styles.constructor__card + ' ml-8'}>
            <ConstructorElement
                type={position}
                isLocked={true}
                text={bun.name + ' ' + positionText}
                price={bun.price}
                thumbnail={bun.image}
            />
        </div>
    );
};

BunConstructor.propTypes = {
    position: PropTypes.string.isRequired,
    positionText: PropTypes.string.isRequired,
    bun: PropTypes.object.isRequired
}

const IngredientsConstructor = ({state}) => {
    let id = 1;

    return (
        <div className={styles.constructor + ' pr-2'}>
            <BunConstructor position='top' positionText='(верх)' bun={state.bun} />

            <div className={styles.constructor__list + ' pr-2'}>
                {state.cart.map((ingredient) => (
                    <div key={id++}>
                        <ConstructorElements
                            text={ingredient.name}
                            price={ingredient.price}
                            thumbnail={ingredient.image}
                        />
                    </div>
                ))}
            </div>

            <BunConstructor position='bottom' positionText='(низ)' bun={state.bun} />
        </div>
        
    );
};

IngredientsConstructor.propTypes = {
    state: PropTypes.shape({
        cart: PropTypes.array.isRequired,
        bun: dataPropTypes.isRequired
    }).isRequired
};

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.burgerConstructor);
    const orderModal = useSelector(store => store.modal.orderModal)

    const totalPrice = useMemo(() => {
        let cartPrice = data.bun.price * 2;

        data.cart.forEach(ingredient => {
            cartPrice += ingredient.price;
        });

        return cartPrice
    }, [data.bun, data.cart]);


    const handleSubmit = (e, orderId) => {
        e.preventDefault();

        const body = {
            'ingredients': orderId
        };

        dispatch(getOrderId(body));
    };

    const closeModal = () => {
        dispatch({type: CLOSE_MODAL})
    };


    return (
        <>
            <section className="mt-25 ml-10">
                <div>
                    {!data.isLoading && <IngredientsConstructor state={data}/>}
                </div>

                <div className={styles.price + ' mt-10 mr-4'}>
                    <div className={styles.price__value + ' mr-10'}>
                        <h1 className='text text_type_digits-medium mr-2'>{`${data.totalPrice}`}</h1>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large" onClick={(e) => handleSubmit(e, orderModal.orderId)}>
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {orderModal.isVisible && (<Modal closeModal={closeModal} headerTitle={false}>
                <OrderDetails />
            </Modal>)}
        </>
    );
};

export default BurgerConstructor