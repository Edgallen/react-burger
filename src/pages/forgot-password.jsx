import React, {useEffect, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {requestRecovery} from "../services/actions/auth";
import Layout from "./layout";

export const ForgotPasswordPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(store => store.auth);
    const [inputs, setInputs] = useState({
        email: ''
    })
    const inputRef = React.useRef(null)

    const onClickHandle = () => {
        const body = {
            "email": inputs.email
        }
        // @ts-ignore
        dispatch(requestRecovery(body));
    };

    useEffect(() => {
        if (!data.isForgot) {
            data.isAuth === true ? navigate('/profile') : navigate('/login')
        }
    }, [data.isForgot, data.isAuth]);

    useEffect(() => {
        if (data.recoveryRequest) {
            navigate(`/reset-password`);
        }
    }, [data.recoveryRequest])

    return (
        <Layout>
            <section className={styles.login}>
                <div className={styles.login__form}>
                    <h1 className="text text_type_main-medium">Восстановление пароля</h1>

                    <Input
                        type={'email'}
                        placeholder={'Укажите e-mail'}
                        onChange={e => setInputs({
                            ...inputs,
                            email: e.target.value
                        })}
                        error={false}
                        value={inputs.email}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />

                    <Button
                        type="primary"
                        size="big"
                        onClick={onClickHandle}
                    >
                        Восстановить
                    </Button>
                </div>

                <div className={`${styles.login__service} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспоинили пароль?
                        <Link
                            className={styles.login__link}
                            to='/login'
                        > Войти</Link>
                    </p>
                </div>
            </section>
        </Layout>
    );
};