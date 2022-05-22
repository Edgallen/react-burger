import React, {useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
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
                <h1 className="text text_type_main-medium">Регистрация</h1>

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
                    errorText={'Ошибка'}
                />

                <Input
                    className={'mb-6'}
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
                    type={'password'}
                    placeholder={'Пароль'}
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

                <Button type="primary" size="big">
                    Зарегестрироваться
                </Button>
            </div>

            <div className={`${styles.login__service} mt-20`}>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Уже зарегестрировались?
                    <Link
                        className={styles.login__link}
                        to='/login'
                    > Войти</Link>
                </p>
            </div>
        </section>

    );
};