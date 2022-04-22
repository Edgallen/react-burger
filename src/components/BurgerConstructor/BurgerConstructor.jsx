import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {dataPropTypes} from '../../utils/dataPropTypes';

function ConstructorElements({text, price, thumbnail}) {
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

const IngredientsConstructor = ({orderList, buns}) => {
    let id = 1;

    return (
        <div className={styles.constructor + ' pr-2'}>
            <div className={styles.constructor__card + ' ml-8'}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={buns.name + ' (верх)'}
                    price={buns.price}
                    thumbnail={buns.image}
                />
            </div>
            
            <div className={styles.constructor__ingredients}>
                <div className={styles.constructor__list + ' pr-2'}>
                    {orderList.map((ingredient, index) => (
                        <div key={id++}>
                            <ConstructorElements
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.constructor__card + ' ml-8'}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={buns.name + ' (низ)'}
                    price={buns.price}
                    thumbnail={buns.image}
                />
            </div>
        </div>
        
    );
};

IngredientsConstructor.propTypes = {
    orderList: PropTypes.arrayOf(dataPropTypes).isRequired,
    buns: PropTypes.object.isRequired,
};

const BurgerConstructor = ({orderList, openClick}) => {
    const [state, setState] = useState({
        cart: [],
        buns: {}
    });

    useEffect(() => {
        setState(({
            ...state,
            cart: orderList.filter(element => element.type !== 'bun'),
            buns: orderList.find(element => element.type === 'bun'),
        }))
    }, []);

    return (
        <section className="mt-25 ml-10">
            <div>
                <IngredientsConstructor
                    orderList={state.cart}
                    buns={state.buns}
                />
            </div>

            <div className={styles.price + ' mt-10 mr-4'}>
                <div className={styles.price__value + ' mr-10'}>
                    <h1 className='text text_type_main-large mr-2'>1600</h1>
                    <CurrencyIcon type="primary" />
                </div>
                <Button type="primary" size="large" onClick={openClick}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
};

BurgerConstructor.propTypes = {
    orderList: PropTypes.arrayOf(dataPropTypes).isRequired,
    openClick: PropTypes.func.isRequired
}

export default BurgerConstructor