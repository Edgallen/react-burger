import React, {useRef} from "react";
import PropTypes from 'prop-types';

import styles from './IngredientsConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/dataPropTypes';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeFromCart } from '../../services/actions/burgerConstructor';

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
};

const ConstructorElements = ({ingredient, index, moveCard}) => {
    const dispatch = useDispatch();

    const id = ingredient._id;
    const ref = useRef(null);
    const [, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        }
    });

    const [, drop] = useDrop({
        accept: 'card',
        hover: (item, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });

    const handleDelete = (index) => {
        dispatch(removeFromCart(index));
    };

    drag(drop(ref));
    return (
        <>
            <li className={styles.constructor__card} ref={ref}>
                <DragIcon type="primary" />
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={() => handleDelete(index)}
                />
            </li>
        </>
    );
};

ConstructorElements.propTypes = {
    ingredient: dataPropTypes.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
};

const IngredientsConstructor = ({state, moveCard}) => {
    return (
        <div className={styles.constructor + ' pr-2'}>
            {state.bun.type && <BunConstructor position='top' positionText='(верх)' bun={state.bun} />}

            <div className={styles.constructor__list + ' pr-2'}>
                {state.cart.map((ingredient, index) => (
                    <ConstructorElements
                        ingredient={ingredient}
                        index={index}
                        moveCard={moveCard}
                        key={state.cartIds[index]}
                    />
                ))}
            </div>

            {state.bun.type && <BunConstructor position='bottom' positionText='(низ)' bun={state.bun} />}
        </div>
        
    );
};

IngredientsConstructor.propTypes = {
    state: PropTypes.shape({
        cart: PropTypes.arrayOf(dataPropTypes).isRequired,
        bun: dataPropTypes.isRequired
    }).isRequired,
    moveCard: PropTypes.func.isRequired
};

export default IngredientsConstructor