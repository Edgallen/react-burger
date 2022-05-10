import React, {useState, useEffect, useMemo, createRef} from "react";
import PropTypes from 'prop-types';

import styles from "./BurgerIngredients.module.css"
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {dataPropTypes} from '../../utils/dataPropTypes';
import {useDispatch, useSelector} from "react-redux";
import {CLOSE_MODAL, OPEN_INGREDIENT_MODAL} from "../../services/actions/modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

const Ingredient = ({ingredient, openModal}) => {
    const handleIngredientClick = (e) => {
        e.preventDefault();
        openModal(ingredient);
    };

    return (
        <div className={styles.card + ' mt-6 ml-4 mr-2'} onClick={handleIngredientClick}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={styles.card__price + ' mt-1'}>
                <h3 className='text text_type_digits-default mr-2'>{ingredient.price}</h3>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.card__name + " text text_type_main-default mt-1"}>{ingredient.name}</p>
        </div>
    );
};

Ingredient.propTypes = {
    ingredient: dataPropTypes.isRequired,
    openModal: PropTypes.func.isRequired
};

const Menu = ({menu, type, openModal}) => {
    return (
        <>
            <h1 className="text text_type_main-medium mt-10">{type}</h1>

            <div className={styles.menu__type}>
                {menu.map((ingredient) =>(
                    <div key={ingredient._id}>
                        <Ingredient
                            ingredient={ingredient}
                            openModal={openModal}
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

Menu.propTypes = {
    menu: PropTypes.arrayOf(dataPropTypes).isRequired,
    type: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired
};

const BurgerIngredients = () => {
    const dispatch = useDispatch();
    const data = useSelector(store => store.burgerIngredients.ingredients)
    const ingredientModal = useSelector(store => store.modal.ingredientModal)
    const [state, setState] = useState({
        bun: {
            ingredients: [],
            title: 'Булки'
        },
        sauce: {
            ingredients: [],
            title: 'Соусы'
        },
        main: {
            ingredients: [],
            title: 'Начинки'
        }
    });

    const tabsRef = useMemo( () => (
        {
            bun: createRef(),
            sauce: createRef(),
            main: createRef()
        }
    ), []);

    const ingredientGroupsTypes = Object.keys(state);
    const [currentIngredientsType, setCurrentIngredientsType] = useState(ingredientGroupsTypes[0])

    useEffect(() => {
        setState({
            ...state,
            bun: {
                ...state.bun,
                ingredients: data.filter(element => element.type === 'bun')
            },
            sauce: {
                ...state.sauce,
                ingredients: data.filter(element => element.type === 'sauce')
            },
            main: {
                ...state.main,
                ingredients: data.filter(element => element.type === 'main')
            }
        })
    }, [data]);

    const openModal = (e) => {
        dispatch({
            type: OPEN_INGREDIENT_MODAL,
            ingredient: e
        });
    };
    const closeModal = () => {
        dispatch({type: CLOSE_MODAL})
    };

    const selectTab = (tab) => {
        tabsRef[tab].current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const container = document.querySelector(`.${styles.menu__ingredients}`);
        const tabs = document.querySelector(`.${styles.menu__filter}`);
        const headings = container.querySelectorAll('h1');

        const border = tabs.getBoundingClientRect().bottom;

        const scrollHandler = () => {
            const distances = [];

            headings.forEach((heading, i) => {
                const coords = heading.getBoundingClientRect();
                distances[i] = Math.abs(border - coords.top);
            })

            const currentMinDistance = Math.min(...distances);

            distances.forEach((distance, i) => {
                if (distance === currentMinDistance) {
                    setCurrentIngredientsType(ingredientGroupsTypes[i]);
                }
            })
        };

        if (data.length > 0) {
            container.addEventListener('scroll', scrollHandler);
        }

        return () => {
            container.removeEventListener('scroll', scrollHandler);
        };
    }, [data]);

    return (
        <>
            <section className='burgerIngredients'>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

                {!data.isLoading && !data.isFailed && (
                    <div className={styles.menu__filter}>
                        {ingredientGroupsTypes.map((type) => (
                            <Tab
                                key={type}
                                active={type === currentIngredientsType}
                                value={type}
                                onClick={() => selectTab(type)}
                            >
                                {state[type].title}
                            </Tab>
                        ))}
                    </div>
                )}

                {!data.isLoading && !data.isFailed && (
                    <div className={styles.menu__ingredients}>
                        {ingredientGroupsTypes.map((type) => (
                            <div key={type} ref={tabsRef[type]}>
                                <Menu
                                    menu={state[type].ingredients}
                                    type={state[type].title}
                                    openModal={openModal}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </section>

            {ingredientModal.isVisible && (<Modal closeModal={closeModal} headerTitle='Детали ингредиента'>
                <IngredientDetails/>
            </Modal>)}
        </>
    );
};

export default BurgerIngredients;