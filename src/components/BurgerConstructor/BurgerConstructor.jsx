import React from "react";
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

function ConstructorElements({text, price, thumbnail, type, isLocked, isDrag, key}) {
    function checkDrag() {
        let value;
        if (isDrag === true) {
            value = <DragIcon type="primary" />;
            return value
        }
        value = <p className="ml-8"> </p>
        return value;
    }
    return (
        <div className={styles.constructor__card + " ml-8"} key={key}>
            {checkDrag()}
            <ConstructorElement
                type={type}
                isLocked={isLocked}
                text={text}
                price={price}
                thumbnail={thumbnail}
            />
        </div>
    );
};

ConstructorElements.propTypes = {
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    type: PropTypes.string,
    isLocked: PropTypes.bool,
    isDrag: PropTypes.bool,
    key: PropTypes.string
};

const IngredientsConstructor = ({orderList}) => {
    function getLastIndex() {
        return orderList.length - 1
    }

    return (
        <div className={styles.constructor + ' pr-2'}>
            {orderList.map((ingredient, index) => (
                <ConstructorElements
                    type={
                        orderList[0] === ingredient ? 'top' : '' || orderList[getLastIndex()] === ingredient ? 'bottom' : ''
                    }
                    isLocked={
                        orderList[0] === ingredient || orderList[getLastIndex()] === ingredient ? true : false
                    }
                    isDrag={
                        orderList[0] === ingredient || orderList[getLastIndex()] === ingredient ? false : true
                    }
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    key={ingredient.index}
                 />
            ))}
        </div>
    );
};

IngredientsConstructor.propTypes = {
    orderList: PropTypes.array,
};

class BurgerConstructor extends React.Component {
    state = {
        orderList: this.props.orderList
    }

    render() {
        return (
            <div className="mt-25 ml-10">
                <div>
                    <IngredientsConstructor orderList={this.state.orderList} />
                </div>

                <div className={styles.price + ' mt-10'}>
                    <div className={styles.price__value + ' mr-10'}>
                        <h1 className='text text_type_main-large mr-2'>1600</h1>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
        );
    };
};

export default BurgerConstructor