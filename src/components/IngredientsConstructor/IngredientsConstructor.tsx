import React, {useRef, FC} from "react";
import styles from './IngredientsConstructor.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { removeFromCart } from '../../services/actions/burgerConstructor';
import { IBunConstructor, IConstructorElements, IIngredientsConstructor } from "../../types";

const BunConstructor: FC<IBunConstructor> = ({position, positionText, bun}) => {
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

const ConstructorElements: FC<IConstructorElements> = ({ingredient, index, moveCard}) => {
    const dispatch = useDispatch();

    const id = ingredient._id;
    const ref = useRef<HTMLLIElement>(null);
    const [, drag] = useDrag({
        type: 'card',
        item: () => {
            return { id, index }
        }
    });

    const [, drop] = useDrop({
        accept: 'card',
        hover: (item: {id: number; index: number}, monitor) => {
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return
            }
            
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const clientOffset = monitor.getClientOffset();
            if (hoverBoundingRect && clientOffset) {
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
            }

            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex
        },
    });

    const handleDelete = (index: number) => {
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

const IngredientsConstructor: FC<IIngredientsConstructor> = ({state, moveCard}) => {
    return (
        <div className={styles.constructor + ' pr-2'}>
            {state.bun.type && <BunConstructor position='top' positionText='(верх)' bun={state.bun} />}

            <div className={styles.constructor__list + ' pr-2'}>
                {state.cart.map((ingredient, index) => (
                    <ConstructorElements
                        ingredient={ingredient}
                        index={index}
                        moveCard={moveCard}
                        key={ingredient._id}
                    />
                ))}
            </div>

            {state.bun.type && <BunConstructor position='bottom' positionText='(низ)' bun={state.bun} />}
        </div>
        
    );
};

export default IngredientsConstructor