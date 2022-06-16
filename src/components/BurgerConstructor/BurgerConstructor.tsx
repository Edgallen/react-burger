import React, {useMemo, useEffect} from "react";

import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from "react-redux";
import {closeModal, getOrderId, updateOrderModal} from "../../services/actions/modal";
import {addToCart, addBun, setCart} from "../../services/actions/burgerConstructor";
import IngredientsConstructor from '../IngredientsConstructor/IngredientsConstructor'
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDrop } from "react-dnd";
import { v4 as uuid } from 'uuid';
import {useNavigate} from "react-router-dom";
import { TItem } from "../../types";

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((store: any) => store.burgerConstructor);
    const isAuth = useSelector((store: any) => store.auth.isAuth);
    const orderModal = useSelector((store: any) => store.modal.orderModal);

    const [, dropContainer] = useDrop({
        accept: 'ingredient',
        drop(item: TItem) {
            if (item.type === 'bun') {
                dispatch(addBun(item));
                return
            }
            const id = uuid();
            dispatch(addToCart(item, id));
        }
    });

    const totalPrice = useMemo(() => {
        let cartPrice = 0;

        data.cart.forEach((ingredient: TItem) => {
            cartPrice += ingredient.price;
        });

        if (data.bun.price) {
            cartPrice += data.bun.price * 2;
        }

        return cartPrice
    }, [data.bun, data.cart]);

    useEffect(() => {
        let cartId = [];
        data.cart.forEach((ingredient: TItem) => {
            cartId.push(ingredient._id)
        });

        if (data.bun.type) {
            cartId.push(data.bun._id, data.bun._id)
        }

        dispatch(updateOrderModal(cartId));
    }, [data.bun, data.cart]);


    const handleSubmit = (): void => {

        if (!data.bun.type || data.cart.length === 0) {
            return
        }

        if (!isAuth) {
            navigate('/login');
            return
        }

        const body: {'ingredients': string} = {
            'ingredients': orderModal.cartId[0]
        };

        dispatch(getOrderId(body) as any);
    };

    const closeOrderModal = (): void => {
        dispatch(closeModal());
    };
    
    const moveCard = (dragIndex: number, hoverIndex: number): void => {
        const dragCard = data.cart[dragIndex]
        const newCart = [...data.cart];
        newCart.splice(dragIndex, 1);
        newCart.splice(hoverIndex, 0, dragCard);

        dispatch(setCart(newCart));
    };

    return (
        <>
            <section className={styles.section + ` mt-25 ml-10`} ref={dropContainer}>
                {!data.isLoading && (
                    <div>
                        <IngredientsConstructor
                        state={data}
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
                    <Button 
                        type="primary" 
                        size="large" 
                        onClick={handleSubmit}
                    > 
                        Оформить заказ
                    </Button>
                </div>
            </section>

            {orderModal.isVisible && (
                <Modal 
                    headerTitle={false}
                    closeHandler={closeOrderModal}
                >
                    <OrderDetails />
                </Modal>
            )}
        </>
    );
};

export default BurgerConstructor