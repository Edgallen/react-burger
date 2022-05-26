import React, {useEffect, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loginUser, recoveryRequest } from "../services/actions/auth";
import {useCallback} from "react";
import {getCookie} from "../utils/cookies";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(store => store.auth);
    
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordType: 'password',
        passwordIcon: 'ShowIcon'
    });

    useEffect(() => {
        if (data.isAuth) {
            navigate('/profile');
        }
    }, [data.isAuth]);

    const onIconClick = () => {
        inputs.passwordType === 'password'
        ? setInputs({...inputs, passwordType: 'text', passwordIcon: 'HideIcon'})
        : setInputs({...inputs, passwordType: 'password', passwordIcon: 'ShowIcon'});
    };

    const onLogInHandler = (e) => {
        e.preventDefault();
        const data = {
            'email': inputs.email,
            'password': inputs.password
        };
        dispatch(loginUser(data));
    };

    const onForgotClick = (e) => {
        e.preventDefault();
        dispatch(recoveryRequest());
        navigate('/forgot-password')
    };

    return (
        <Layout>
            {!data.isAuth && (<section className={styles.login}>
                <div className={styles.login__form}>
                    <h1 className="text text_type_main-medium">Вход</h1>

                    <Input
                        type={'email'}
                        placeholder={'E-mail'}
                        onChange={e => setInputs({
                            ...inputs,
                            email: e.target.value
                        })}
                        error={false}
                        value={inputs.email}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <Input
                        type={inputs.passwordType}
                        placeholder={'Пароль'}
                        onChange={e => setInputs({
                            ...inputs,
                            password: e.target.value
                        })}
                        error={false}
                        value={inputs.password}
                        onIconClick={onIconClick}
                        icon={inputs.passwordIcon}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <Button
                        type="primary"
                        size="big"
                        onClick={onLogInHandler}
                    >
                        Войти
                    </Button>
                </div>

                <div className={`${styles.login__service} mt-20`}>
                    <p className={`${styles.login__redirectors} text text_type_main-default text_color_inactive mb-4`}>
                        Вы - новый пользователь?
                        <Link
                            className={styles.login__link}
                            to='/register'
                        > 
                            Зарегестрироваться
                        </Link>
                    </p>

                    <p className={`${styles.login__redirectors} text text_type_main-default text_color_inactive mb-4`}>
                        Забыли пароль?
                        <span
                            className={styles.login__link}
                            onClick={onForgotClick}
                        >
                            Восстановить пароль
                        </span>
                    </p>
                </div>
            </section>)}
        </Layout>
    );
};