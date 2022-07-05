import React, {FormEvent, useState} from "react";
import styles from './ProfileLeyout.module.css';
import {useSelector} from "react-redux";
import { getCookie } from "../../utils/cookies";
import { useAuth } from "../../services/authProvider";
import { TAuth } from "../../types";
import {Outlet, useNavigate} from "react-router-dom";

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

export const ProfileLayout = () => {
    const data = useSelector((store: any) => store.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const requestAuth = useAuth();
    let auth: TAuth;
    if (requestAuth) {
        auth = requestAuth;
    }

    const onLogoutHandler = (e: FormEvent) => {
        e.preventDefault();
        const refreshToken = getCookie('refreshToken');
        const body = {
            "token": refreshToken
        };

        if ( auth !== null ) {
            auth.logOut(body);
        }
    };

    const handleProfileClick = () => {
        if (activeTab !== 'profile') {
            navigate(-1);
            setActiveTab('profile');
        }
    }

    const handleOrdersClick = () => {
        navigate('orders');
        setActiveTab('orders');
    }

    return (
        <>
            {data.isAuth && (
                <section className={styles.profile}>
                    <div className={`${styles.profile__selector} mr-15`}>
                        <div className={`${styles.profile__tabs} mb-20`}>
                            <h1 
                                className={`${styles.profile__tab} text text_type_main-medium ${activeTab === 'profile' ? '' : 'text_color_inactive'}`}
                                onClick={handleProfileClick}
                            >
                                Профиль
                            </h1>
                            <h1 
                                className={`${styles.profile__tab} text text_type_main-medium ${activeTab === 'orders' ? '' : 'text_color_inactive'}`}
                                onClick={handleOrdersClick}
                            >
                                История заказов
                            </h1>
                            <h1
                                className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}
                                onClick={onLogoutHandler}
                            >
                                Выход
                            </h1>
                        </div>

                        <div className={styles.profile__description}>
                            <p className='text text_type_main-default text_color_inactive'>
                                В этом разделе вы можете изменить свои персональные данные
                            </p>
                        </div>
                    </div>

                        {activeTab === 'profile'
                            ? (
                                <div className={styles.profile__edits}>
                                    <Outlet />
                                </div>
                            )
                            : (
                                <div className={styles.profile__orders}>
                                    <Outlet />
                                </div>
                            )
                        }

                </section>
            )}
        </>
    );
};