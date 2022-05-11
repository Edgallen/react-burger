import React, {useMemo, useEffect} from "react";
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/dataPropTypes';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, UPDATE_ORDER_MODAL, getOrderId} from "../../services/actions/modal";
import {ADD_TO_CART, REMOVE_FROM_CART} from "../../services/actions/burgerConstructor";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDrag, useDrop } from "react-dnd";

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
    bun: dataPropTypes.isRequired
}

const IngredientsConstructor = ({state, handleDelete}) => {
    let id = 1;
    const [, drag] = useDrag(() => ({
        type: 'burger-part',
        
      }), []);
    
      const [, drop] = useDrop(() => ({
        accept: 'burger-part',
        canDrop: () => false,
        
      }), []);

    return (
        <div className={styles.constructor + ' pr-2'}>
            {state.bun.type && <BunConstructor position='top' positionText='(верх)' bun={state.bun} />}

            <div className={styles.constructor__list + ' pr-2'}>
                {state.cart.map((ingredient, index) => (
                    <div key={id++}>
                        <li className={styles.constructor__card} ref={(node) => drag(drop(node))}>
                            <DragIcon type="primary" />
                            <ConstructorElement
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                                handleClose={() => handleDelete(index)}
                            />
                        </li>
                    </div>
                ))}
            </div>

            {state.bun.type && <BunConstructor position='bottom' positionText='(низ)' bun={state.bun} />}
        </div>
        
    );
};

IngredientsConstructor.propTypes = {
    state: PropTypes.shape({
        cart: PropTypes.array.isRequired,
        bun: PropTypes.object.isRequired
    }).isRequired,
    handleDelete: PropTypes.func.isRequired
};

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
        let cartPrice = data.bun.price * 2;

        data.cart.forEach(ingredient => {
            cartPrice += ingredient.price;
        });

        return isNaN(cartPrice) ? 0 : cartPrice
    }, [data.bun, data.cart]);

    useEffect(() => {
        let cartId = [];
        data.cart.forEach(ingredient => {
            console.log(ingredient)
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


    return (
        <>
            <section className={styles.section + ` mt-25 ml-10`} ref={dropContainer}>
                <div>
                    {!data.isLoading && <IngredientsConstructor state={data} handleDelete={deleteIngredient}/>}
                </div>

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