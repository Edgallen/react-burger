import React, {useState, useEffect, useMemo, createRef, useRef} from "react";
import styles from "./BurgerIngredients.module.css"
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import { Menu } from '../Menu/Menu';
import { Outlet } from "react-router-dom";

const BurgerIngredients = () => {
    const data = useSelector(store => store.burgerIngredients.ingredients);
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

    function useArrayRef() {
        const refs = []
        return [refs, el => el && refs.push(el)]
    }

    const container = useRef(null);
    const tabs = useRef(null);
    const [headings, heading] = useArrayRef()

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
    }, [data, state]);

    const selectTab = (tab) => {
        tabsRef[tab].current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const border = tabs.current.getBoundingClientRect().bottom;

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
            if (container.current) {
                container.current.addEventListener('scroll', scrollHandler);
            }
        }

        return () => {
            if (container.current) {
                container.current.removeEventListener('scroll', scrollHandler);
            }
        };
    }, [container, data, headings, ingredientGroupsTypes]);

    return (
        <>
            <section className='burgerIngredients'>
                <h1 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h1>

                {!data.isLoading && !data.isFailed && (
                    <div className={styles.menu__filter} ref={tabs}>
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
                    <div ref={container} className={styles.menu__ingredients}>
                        {ingredientGroupsTypes.map((type) => (
                            <div key={type} ref={tabsRef[type]}>
                                <h1 
                                    className="text text_type_main-medium mt-10" 
                                    ref={heading}
                                >
                                    {state[type].title}
                                </h1>

                                <Menu
                                    menu={state[type].ingredients}
                                />
                            </div>
                        ))}
                    </div>
                )}

            </section>

            <Outlet />
        </>
    );
};

export default BurgerIngredients;