import React, { useState } from "react";

import styles from './AppHeader.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


function AppHeader() {
    const navigate = useNavigate();
    // @ts-ignore
    const data = useSelector(store => store.auth);
    const [links, setLinks] = useState({
        profileLink: '/login'
    });

    const onProfileClick = () => {
       data.isAuth === false ? navigate('/login') : navigate('/profile')
    }

    const onConstructorClick = () => {
       navigate('/');
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <li className={styles.li}>
                    <button
                        className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}
                        onClick={onConstructorClick}
                    >
                        <BurgerIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Конструктор</p>
                    </button>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента новостей</p>
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
                        <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
                    </button>
                </li>
            </nav>
        </header>
    );
};

export default AppHeader;