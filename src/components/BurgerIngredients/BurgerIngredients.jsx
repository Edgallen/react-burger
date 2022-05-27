import React, {useState, useEffect, useMemo, createRef} from "react";
import styles from "./BurgerIngredients.module.css"
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { Menu } from '../Menu/Menu';
import { Outlet } from "react-router-dom";
import { IngredientPage } from "../../pages";

const BurgerIngredients = () => {
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
                                />
                            </div>
                        ))}
                    </div>
                )}

            </section>

            {ingredientModal.isVisible && (<Modal headerTitle='Детали ингредиента'>
                <Outlet />
            </Modal>)}
        </>
    );
};

export default BurgerIngredients;