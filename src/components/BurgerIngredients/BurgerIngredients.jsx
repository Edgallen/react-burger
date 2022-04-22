import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';

import styles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {dataPropTypes} from '../../utils/dataPropTypes';

function FilterTab() {
    const [current, setCurrent] = React.useState('one')
    return (
        <div className={styles.menu__filter} >
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                Начинка
            </Tab>
        </div>
    );
};


const Ingredients = ({name, price, image, openClick}) => { // сюда!!!
    return (
        <div className={styles.card + ' mt-6 ml-4 mr-2'} onClick={openClick}>
            <img src={image} alt={name}/>
            <div className={styles.card__price + ' mt-1'}>
                <h3 className='mr-2'>{price}</h3>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.card__name + " text text_type_main-default mt-1"}>{name}</p>
        </div>
    )
}

Ingredients.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
}

const Menu = ({menu, type, openClick}) => {
    return (
        <>
            <h1 className="text text_type_main-medium mt-10">{type}</h1>

            <div className={styles.menu__type}>
                {menu.map((ingredient, index) =>(
                    <div key={ingredient._id}>
                        <Ingredients
                            name={ingredient.name}
                            price={ingredient.price}
                            image={ingredient.image}
                            openClick={openClick}
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
}

const BurgerIngredients = ({data, openClick}) => {
    const [state, setState] = useState({
        buns: data.filter(element => element.type === 'bun'),
        sauces: data.filter(element => element.type === 'sauce'),
        mains: data.filter(element => element.type === 'main') 
    });

    return (
        <section className={styles.menu}>
            <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
            
            <FilterTab />
            <div className={styles.menu__ingredients}>  
                <Menu
                    menu={state.buns}
                    type='Булки'
                    openClick={openClick}
                />
                <Menu
                    menu={state.sauces}
                    type='Соусы'
                    openClick={openClick}
                />
                <Menu
                    menu={state.mains}
                    type='Начинка'
                    openClick={openClick}
                />
            </div>   
        </section>
    );
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired,
    openClick: PropTypes.func.isRequired
}

export default BurgerIngredients;