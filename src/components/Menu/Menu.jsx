import React, {useEffect, useState, useRef} from "react";

import styles from "./Menu.module.css";
import PropTypes from "prop-types";
import {dataPropTypes} from "../../utils/dataPropTypes";
import {useDrag} from "react-dnd";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from '../../services/actions/modal'
import { useLocation, useNavigate } from "react-router-dom";

const Ingredient = ({ingredient}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const burgerConstructor = useSelector(store => store.burgerConstructor)
    const [counter, setCounter] = useState({
        count: 0
    });
    const [, ingrRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
    });

    useEffect(() => {
        if (burgerConstructor.bun._id === ingredient._id) {
            setCounter({...counter, count: 2})
            return
        }

        setCounter({
            count: burgerConstructor.cart.filter(item => item._id === ingredient._id).length
        });
    }, [burgerConstructor.cart, burgerConstructor.bun])

    const handleIngredientClick = (e) => {
        e.preventDefault();
        navigate(`/ingredient/${ingredient._id}`, {state: { backgroundLocation: location }})
        dispatch(openModal(ingredient));
    };

    return (
        <div
            className={styles.card + ' mt-6 ml-4 mr-2'}
            onClick={handleIngredientClick}
            ref={ingrRef}
        >
            {counter.count > 0 && <Counter count={counter.count} size="default"/>}
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={styles.card__price + ' mt-1'}>
                <h3 className='text text_type_digits-default mr-2'>{ingredient.price}</h3>
                <CurrencyIcon type="primary"/>
            </div>
            <p 
                className={styles.card__name + " text text_type_main-default mt-1"}
            >
                {ingredient.name}
            </p>
        </div>
    );
};

Ingredient.propTypes = {
    ingredient: dataPropTypes.isRequired
};

export const Menu = ({menu, type}) => {
    return (
        <>
            <div className={styles.menu__type}>
                {menu.map((ingredient) =>(
                    <div key={ingredient._id}>
                        <Ingredient
                            ingredient={ingredient}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

Menu.propTypes = {
    menu: PropTypes.arrayOf(dataPropTypes).isRequired,
    type: PropTypes.string.isRequired
};