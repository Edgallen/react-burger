import React, {useEffect, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Layout from "./layout";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils/cookies";
import {logoutUser} from "../services/actions/auth";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(store => store.auth)
    const [inputs, setInputs] = useState({
        name: '',
        login: '',
        password: '',
        icon: 'EditIcon'
    })
    const inputRef = React.useRef(null)

    useEffect(() => {
        if (!data.isAuth) {
            navigate('/login')
        }
    }, [data.isAuth])

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    };

    const onLogoutClick = (e) => {
        e.preventDefault();
        // @ts-ignore
        const refreshToken = getCookie('refreshToken');
        const body = {
            "token": refreshToken
        };
        dispatch(logoutUser(body));
    };

    return (
        <Layout>
            <section className={styles.profile}>
                <div className={`${styles.profile__selector} mr-15`}>
                    <div className={`${styles.profile__tabs} mb-20`}>
                        <h1 className={`${styles.profile__tab} text text_type_main-medium`}>Профиль</h1>
                        <h1 className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}>История заказов</h1>
                        <h1
                            className={`${styles.profile__tab} text text_type_main-medium text_color_inactive`}
                            onClick={onLogoutClick}
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

                <div className={styles.login__form}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={e => setInputs({
                            ...inputs,
                            name: e.target.value
                        })}
                        error={false}
                        value={inputs.name}
                        ref={inputRef}
                        onIconClick={onIconClick}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={e => setInputs({
                            ...inputs,
                            login: e.target.value
                        })}
                        error={false}
                        value={inputs.login}
                        ref={inputRef}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                    />

                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setInputs({
                            ...inputs,
                            password: e.target.value
                        })}
                        error={false}
                        value={inputs.password}
                        ref={inputRef}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                    />

                </div>
            </section>
        </Layout>
    );
};