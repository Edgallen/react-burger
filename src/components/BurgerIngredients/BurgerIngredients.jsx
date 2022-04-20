import React from "react";
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


const Ingredients = ({name, price, image}) => {
    return (
        <div className={styles.card + ' mt-6 ml-4 mr-2'}>
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

const Menu = ({menu, type}) => {
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

class BurgerIngredients extends React.Component {
    state = {
        buns: [],
        sauces: [],
        mains: []
    }

    componentWillMount() {
        this.props.data.forEach(ingredient => {
            if (ingredient.type === 'bun') {
                this.state.buns.push(ingredient);
            } else if (ingredient.type === 'sauce') {
                this.state.sauces.push(ingredient);
            } else if (ingredient.type === 'main') {
                this.state.mains.push(ingredient);
            }
        });
    };

    render() {
        return (
            <section className={styles.menu}>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>
                
                <FilterTab />
                <div className={styles.menu__ingredients}>  
                    <Menu
                        menu={this.state.buns}
                        type='Булки'
                    />
                    <Menu
                        menu={this.state.sauces}
                        type='Соусы'
                    />
                    <Menu
                        menu={this.state.mains}
                        type='Начинка'
                    />
                </div>   
            </section>
        );
    }  
};

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes).isRequired
}

export default BurgerIngredients;