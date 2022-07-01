import React from "react";
import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();

    const onConstructorClick = () => {
       navigate('/');
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <li className={styles.li}>
                    <NavLink
                        to={`/`}
                        style={{ textDecoration: 'none' }}
                    >
                        {({isActive}) => (
                            <div className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                                <BurgerIcon type={isActive ? "primary" : "secondary" } />
                                <p
                                    style={{
                                        color: isActive ? "white" : "",
                                    }}
                                    className={`${styles.button__text} text text_type_main-default text_color_inactive pl-2`}
                                >
                                    Конструктор
                                </p>
                            </div>
                        )}
                    </NavLink>
                    <NavLink
                        to={`/feed`}
                        style={{ textDecoration: 'none' }}
                    >
                        {({isActive}) => (
                            <div className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                                <ListIcon type={isActive ? "primary" : "secondary" } />
                                <p
                                    style={{
                                        color: isActive ? "white" : "",
                                    }}
                                    className={`${styles.button__text} text text_type_main-default text_color_inactive pl-2`}
                                >
                                    Лента новостей
                                </p>
                            </div>
                        )}
                    </NavLink>
                </li>

                <li className={styles.li} onClick={onConstructorClick}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                </li>

                <li className={styles.li}>
                    <NavLink
                        to={`/profile`}
                        style={{ textDecoration: 'none' }}
                    >
                        {({isActive}) => (
                            <div className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                                <ProfileIcon type={isActive ? "primary" : "secondary" } />
                                <p
                                    style={{
                                        color: isActive ? "white" : "",
                                    }}
                                    className={`${styles.button__text} text text_type_main-default text_color_inactive pl-2`}
                                >
                                    Личный кабинет
                                </p>
                            </div>
                        )}
                    </NavLink>
                </li>
            </nav>
        </header>
    );
}

export default AppHeader;