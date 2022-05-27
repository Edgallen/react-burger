import React, {useEffect, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../services/actions/auth";
import { Link, useNavigate } from "react-router-dom";

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(store => store.auth)
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        passwordType: 'password',
        passwordIcon: 'ShowIcon'
    })
    const inputRef = React.useRef(null)

    useEffect(() => {
        if (data.isAuth) {
            navigate(`/profile`);
        };
    }, [data.isAuth]);

    const onIconClick = () => {
        inputs.passwordType === 'password'
        ? setInputs({...inputs, passwordType: 'text', passwordIcon: 'HideIcon'}) 
        : setInputs({...inputs, passwordType: 'password', passwordIcon: 'ShowIcon'});
    }

    const onRegisterClick = (e) => {
        e.preventDefault();
        const body = {
            'email': inputs.email,
            'password': inputs.password,
            'name': inputs.name,
        }

        dispatch(registerUser(body));
    };

    return (
        <>
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
                        onClick={onRegisterClick}
                    >
                        Зарегестрироваться
                    </Button>
                </div>

                <div className={`${styles.login__service} mt-20`}>
                    <p className="text text_type_main-default text_color_inactive mb-4">
                        Уже зарегестрировались?
                        <Link
                            className={styles.login__link}
                            to='/login'
                        > 
                            Войти
                        </Link>
                    </p>
                </div>
            </section>
        </> 
    );
};