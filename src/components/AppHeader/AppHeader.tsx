import React from "react";

import styles from './AppHeader.module.css'
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <li className={styles.li}>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                        <BurgerIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Конструктор</p>
                    </button>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                        <ListIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Лента новостей</p>
                    </button>
                </li>

                <li className={styles.li}>
                    <Logo />
                </li>

                <li className={styles.li}>
                    <button className={styles.button + ' mt-4 mb-4 pl-5 pr-5 pt-4 pb-4'}>
                        <ProfileIcon type="secondary" />
                        <p className="text text_type_main-default text_color_inactive pl-2">Личный кабинет</p>
                    </button>
                </li>
            </nav>
        </header>
    );
};

export default AppHeader;