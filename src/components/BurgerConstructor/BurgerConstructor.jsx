import React, {useState, useEffect, useContext, useMemo} from "react";
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {dataPropTypes} from '../../utils/dataPropTypes';
import {ConstructorContext} from "../services/constructorContext";

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

const BurgerConstructor = ({ handleSubmit }) => {
    const { data } = useContext(ConstructorContext);
    const [state, setState] = useState({
        cart: [],
        bun: {},
        isLoading: true
    });
    const [order, setOrder] = useState({
        orderId: null
    });

    const totalPrice = useMemo(() => {
        let cartPrice = 0;
        const bunPrice = state.bun.price * 2;
        
        state.cart.forEach(ingredient => {
            cartPrice += ingredient.price;
        });

        return `${cartPrice + bunPrice}`
    }, [state.bun.price, state.cart]);

    useEffect(() => {
        setState({
            ...state,
            cart: data.ingredients.filter(element => element.type !== 'bun'),
            bun: data.ingredients.find(element => element.type === 'bun'),
            isLoading: false
        });
    }, [data]);

    useEffect(() => {
        let cartId = [state.bun._id, state.bun._id];
        state.cart.forEach(ingredient => {
            cartId.push(ingredient._id)
        });

        setOrder({
            ...order,
            orderId: cartId
        });
    }, [handleSubmit]);

    return (
        <section className="mt-25 ml-10">
            <div>
                {!state.isLoading && <IngredientsConstructor state={state}/>}
            </div>

            <div className={styles.price + ' mt-10 mr-4'}>
                <div className={styles.price__value + ' mr-10'}>
                    <h1 className='text text_type_digits-medium mr-2'>{totalPrice}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={(e) => handleSubmit(e, order.orderId)}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default BurgerConstructor