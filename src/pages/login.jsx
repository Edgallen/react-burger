import React, {useEffect, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/actions/auth";
import {useCallback} from "react";
import {getCookie} from "../utils/cookies";

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(store => store.auth)
    
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        passwordType: 'password',
        passwordIcon: 'ShowIcon'
    })
    const inputRef = React.useRef(null)

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

    const onLogInClick = (e) => {
        e.preventDefault();
        const data = {
            'email': inputs.email,
            'password': inputs.password
        }
        dispatch(loginUser(data));
    }

    return (
        <Layout>
            <section className={styles.login}>
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
                        ref={inputRef}
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
                        ref={inputRef}
                        onIconClick={onIconClick}
                        icon={inputs.passwordIcon}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <Button
                        type="primary"
                        size="big"
                        onClick={onLogInClick}
                    >
                        Войти
                    </Button>
                </div>

                <div className={`${styles.login__service} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вы - новый пользователь?
                        <Link
                            className={styles.login__link}
                            to='/register'
                        > Зарегестрироваться</Link>
                    </p>

                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Забыли пароль?
                        <Link
                            className={styles.login__link}
                            to='/forgot-password'
                        > Восстановить пароль</Link>
                    </p>
                </div>
            </section>
        </Layout>
    );
};