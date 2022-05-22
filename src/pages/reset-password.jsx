import React, {useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";

export const ResetPasswordPage = () => {
    const [inputs, setInputs] = useState({
        code: '',
        password: '',
        passwordIcon: 'ShowIcon'
    })
    const inputRef = React.useRef(null)

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        alert('Icon Click Callback')
    }

    return (
        <section className={styles.login}>
            <div className={styles.login__form}>
                <h1 className="text text_type_main-medium">Восстановление пароля</h1>

                <Input
                    type={'password'}
                    placeholder={'Введите новый пароль'}
                    onChange={e => setInputs({
                        ...inputs,
                        password: e.target.value
                    })}
                    error={false}
                    value={inputs.password}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    icon={'ShowIcon'}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setInputs({
                        ...inputs,
                        code: e.target.value
                    })}
                    error={false}
                    value={inputs.code}
                    ref={inputRef}
                    errorText={'Ошибка'}
                />

                <Button type="primary" size="big">
                    Сохранить
                </Button>
            </div>

            <div className={`${styles.login__service} mt-20`}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вспоинили вопрос? <a className={styles.login__link} href={'localHost:3000'}>Войти</a>
                </p>
            </div>
        </section>

    );
};