import React from "react";

import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import {NavLink, useNavigate} from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();

    const onProfileClick = () => {
       navigate('/profile')
    }

    const onConstructorClick = () => {
       navigate('/');
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <li className={styles.li}>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'} onClick={onConstructorClick}>
                        <BurgerIcon type="secondary" />
                        <NavLink
                            style={({ isActive }) => {
                                return {
                                    textDecoration: 'none',
                                    color: isActive ? "white" : "",
                                };
                            }}
                            to={`/`}
                            className="text text_type_main-default text_color_inactive pl-2"
                        >
                            Конструктор
                        </NavLink>
                    </button>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                        <ListIcon type="secondary" />
                        <p
                            className="text text_type_main-default text_color_inactive pl-2"
                        >
                            Лента новостей
                        </p>
                    </button>
                </li>

                <li className={styles.li} onClick={onConstructorClick}>
                    <Logo />
                </li>

                <li className={styles.li}>
                    <button 
                        className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}
                        onClick={onProfileClick}
                    >
                        <ProfileIcon type="secondary" />
                        <NavLink
                            style={({ isActive }) => {
                                return {
                                    textDecoration: 'none',
                                    color: isActive ? "white" : "",
                                };
                            }}
                            to={`/profile`}
                            className="text text_type_main-default text_color_inactive pl-2"
                        >
                            Личный кабинет
                        </NavLink>
                    </button>
                </li>
            </nav>
        </header>
    );
}

export default AppHeader;