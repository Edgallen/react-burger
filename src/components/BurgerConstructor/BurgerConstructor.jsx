import React, {useState, useEffect, useContext} from "react";
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
        bun: PropTypes.object.isRequired
    }).isRequired
};

const BurgerConstructor = ({orderList, handleSubmit}) => {
    const [state, setState] = useState({
        cart: [],
        bun: {}
    });
    const {cart, setCart} = useContext(ConstructorContext);

    useEffect(() => {
        setState({
            ...state,
            cart: orderList.filter(element => element.type !== 'bun'),
            bun: orderList.find(element => element.type === 'bun'),
        });
    }, []);

    useEffect(() => {
        const bunPrice = state.bun.price * 2;

        let cartPrice = 0;
        let cartId = [state.bun._id, state.bun._id];
        state.cart.forEach(ingredient => {
            cartPrice += ingredient.price;
            cartId.push(ingredient._id)
        });

        setCart({
            ...cart,
            total: `${bunPrice + cartPrice}`,
            orderId: cartId
        });
    }, [cart]);

    return (
        <section className="mt-25 ml-10">
            <div>
                <IngredientsConstructor
                    state={state}
                    orderList={state.cart}
                    buns={state.bun}
                    cart={cart}
                    setCart={setCart}
                />
            </div>

            <div className={styles.price + ' mt-10 mr-4'}>
                <div className={styles.price__value + ' mr-10'}>
                    <h1 className='text text_type_main-large mr-2'>{cart.total}</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={handleSubmit}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    orderList: PropTypes.arrayOf(dataPropTypes).isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default BurgerConstructor