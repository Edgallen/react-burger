import React, {useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import {resetPassword} from "../services/actions/auth";
import { useDispatch } from "react-redux";
import Layout from "./layout";

export const ResetPasswordPage = () => {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        token: '',
        password: '',
        passwordType: 'password',
        passwordIcon: 'ShowIcon'
    })
    const inputRef = React.useRef(null)

    const onIconClick = () => {
        inputs.passwordType === 'password'
        ? setInputs({...inputs, passwordType: 'text', passwordIcon: 'HideIcon'}) 
        : setInputs({...inputs, passwordType: 'password', passwordIcon: 'ShowIcon'});
    }

    const onRecoveryClick = () => {
        const body = {
            'password': inputs.password,
            'token': inputs.token
        }

        dispatch(resetPassword(body))
    };

    return (
        <Layout>
            <section className={styles.login}>
                <div className={styles.login__form}>
                    <h1 className="text text_type_main-medium">Восстановление пароля</h1>

                    <Input
                        type={inputs.passwordType}
                        placeholder={'Введите новый пароль'}
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

                    <Input
                        type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={e => setInputs({
                            ...inputs,
                            token: e.target.value
                        })}
                        error={false}
                        value={inputs.token}
                        ref={inputRef}
                        errorText={'Ошибка'}
                    />

                    <Button 
                        type="primary"
                        size="big"
                        onClick={onRecoveryClick}
                    >
                        Сохранить
                    </Button>
                </div>

                <div className={`${styles.login__service} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Вспоинили вопрос?
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