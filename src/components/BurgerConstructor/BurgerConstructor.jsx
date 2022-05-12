import React, {useMemo, useEffect} from "react";

import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, UPDATE_ORDER_MODAL, getOrderId} from "../../services/actions/modal";
import {ADD_TO_CART, SET_CART, REMOVE_FROM_CART} from "../../services/actions/burgerConstructor";
import IngredientsConstructor from '../IngredientsConstructor/IngredientsConstructor'
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDrop } from "react-dnd";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.burgerConstructor);
    const orderModal = useSelector(store => store.modal.orderModal);


    const [, dropContainer] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch({
                type: ADD_TO_CART,
                payload: item
            })
        }
    });

    const totalPrice = useMemo(() => {
        let cartPrice = 0;

        data.cart.forEach(ingredient => {
            cartPrice += ingredient.price;
        });

        if (data.bun.price) {
            cartPrice += data.bun.price * 2;
        }

        return cartPrice
    }, [data.bun, data.cart]);

    useEffect(() => {
        let cartId = [];
        data.cart.forEach(ingredient => {
            cartId.push(ingredient._id)
        });

        if (data.bun.type) {
            cartId.push(data.bun._id, data.bun._id)
        }

        dispatch({
            type: UPDATE_ORDER_MODAL,
            payload: cartId
        })
    }, [data.bun, data.cart]);


    const handleSubmit = (e, cartId) => {
        e.preventDefault();

        const body = {
            'ingredients': cartId
        };

        dispatch(getOrderId(body));
    };

    const closeModal = () => {
        dispatch({type: CLOSE_MODAL})
    };

    const deleteIngredient = (index) => {
        dispatch({
            type: REMOVE_FROM_CART,
            payload: index
        })
    };
    
    const moveCard = (dragIndex, hoverIndex) => {
        const dragCard = data.cart[dragIndex]
        const newCart = [...data.cart];
        newCart.splice(dragIndex, 1);
        newCart.splice(hoverIndex, 0, dragCard);

        dispatch({
            type: SET_CART,
            payload: newCart
        });
    };

    return (
        <>
            <section className={styles.section + ` mt-25 ml-10`} ref={dropContainer}>
                {!data.isLoading && (
                    <div>
                        <IngredientsConstructor
                        state={data}
                        handleDelete={deleteIngredient}
                        moveCard={moveCard}
                        />
                    </div>
                )}

                {data.isLoading && (
                    <div className={styles.constructor__isLoading} >
                        <h1 className="text text_type_main-medium text_color_inactive" >Перетащите сюда ингредиенты</h1>
                    </div>
                )}

                <div className={styles.price + ' mt-10 mr-4'}>
                    <div className={styles.price__value + ' mr-10'}>
                        <h1 className='text text_type_digits-medium mr-2'>{`${totalPrice}`}</h1>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large" onClick={(e) => handleSubmit(e, orderModal.cartId[0])}>
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