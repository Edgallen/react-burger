import React, {useEffect, useState} from "react";
import styles from './pages.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {recoveryRequest} from "../services/actions/auth";
import {useAuth} from "../services/authProvider";

type TInputs = {
    email: string;
    password: string;
    passwordType: "email" | "password" | "text" | undefined;
    passwordIcon: any;
}

export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location: any = useLocation();
    const auth = useAuth();
    const data = useSelector((store: any) => store.auth);
    
    const [inputs, setInputs] = useState<TInputs>({
        email: '',
        password: '',
        passwordType: 'password',
        passwordIcon: 'ShowIcon'
    });

    const onIconClick = () => {
        inputs.passwordType === 'password'
        ? setInputs({...inputs, passwordType: 'text', passwordIcon: 'HideIcon'})
        : setInputs({...inputs, passwordType: 'password', passwordIcon: 'ShowIcon'});
    };

    const redirectPath = location.state?.path || '/';

    const onSubmitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const body = {
            'email': inputs.email,
            'password': inputs.password
        };
        if (auth) {
            auth.logIn(body);
        }
        navigate(redirectPath, {replace: true});
    };

    const onForgotClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(recoveryRequest());
        navigate('/forgot-password');
    };

    useEffect(() => {
        console.log(auth)
    },[auth])

    return (
        <>
            {!data.isAuth && (<section className={styles.login}>
                <form className={styles.login__form} onSubmit={onSubmitHandler}>
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
                        size="large"
                    >
                        Войти
                    </Button>
                </form>

                <div className={`${styles.login__service} mt-20`}>
                    <p className={`${styles.login__redirections} text text_type_main-default text_color_inactive mb-4`}>
                        Вы - новый пользователь?
                        <Link
                            className={styles.login__link}
                            to='/register'
                        > 
                            Зарегестрироваться
                        </Link>
                    </p>

                    <p className={`${styles.login__redirections} text text_type_main-default text_color_inactive mb-4`}>
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
        </>
    );
};