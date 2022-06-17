import React, {useState, useEffect, useMemo, createRef, useRef} from "react";
import styles from "./BurgerIngredients.module.css"
import { Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from "react-redux";
import { Menu } from '../Menu/Menu';
import { Outlet } from "react-router-dom";
import { TItem } from "../../types";

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

interface IState {
    [key: string]: {
        ingredients: Array<TItem>;
        title: string;
    }
}

interface ITabsRef {
    [key: string]: React.RefObject<HTMLDivElement>;
}

const BurgerIngredients = () => {
    const data = useSelector((store: any) => store.burgerIngredients.ingredients);
    const [state, setState] = useState<IState>({
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

    const container = useRef<HTMLDivElement>(null);
    const tabs = useRef<HTMLDivElement>(null);

    const headingRef = useRef<Array<HTMLHeadingElement>>([]);
    useEffect(() => {
        headingRef.current = headingRef.current.slice(0, ingredientGroupsTypes.length);
    }, [headingRef]);

    const tabsRef = useMemo<ITabsRef>(() => (
        {
            bun: createRef<HTMLDivElement>(),
            sauce: createRef<HTMLDivElement>(),
            main: createRef<HTMLDivElement>()
        }
    ), []);

    const ingredientGroupsTypes = Object.keys(state);
    const [currentIngredientsType, setCurrentIngredientsType] = useState(ingredientGroupsTypes[0]);

    useEffect(() => {
        setState({
            ...state,
            bun: {
                ...state.bun,
                ingredients: data.filter((element: TItem) => element.type === 'bun')
            },
            sauce: {
                ...state.sauce,
                ingredients: data.filter((element: TItem) => element.type === 'sauce')
            },
            main: {
                ...state.main,
                ingredients: data.filter((element: TItem) => element.type === 'main')
            }
        })
    }, [data, state]);

    const selectTab = (tab: string): void => {
        if (tabsRef[tab].current) {
            tabsRef[tab].current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (tabs.current) {
            const border = tabs.current.getBoundingClientRect().bottom;

            const scrollHandler = () => {
                const distances: Array<number> = [];
    
                headingRef.current.forEach((heading: HTMLHeadingElement, i: number) => {
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
        }

    }, [container, data, headingRef, ingredientGroupsTypes]);

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
                        {ingredientGroupsTypes.map((type: string, index: number) => (
                            <div key={type} ref={tabsRef[type]}>
                                <h1 
                                    className="text text_type_main-medium mt-10" 
                                    ref={(el: HTMLHeadingElement) => (headingRef.current[index] = el)}
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