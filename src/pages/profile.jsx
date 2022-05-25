import React, {useEffect, useRef, useState} from "react";
import styles from './validation.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import Layout from "./layout";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getCookie} from "../utils/cookies";
import {getUser, logoutUser, updateUser} from "../services/actions/auth";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector(store => store.auth)
    const [nameEdit, setNameEdit] = useState(true)
    const [loginEdit, setLoginEdit] = useState(true)
    const [passwordEdit, setPasswordEdit] = useState(true)
    const [inputs, setInputs] = useState({
        name: '',
        login: '',
        password: '',
        icon: 'EditIcon',
    });

    useEffect(() => {
        dispatch(getUser());

        setInputs({
            ...inputs,
            name: data.user.name,
            login: data.user.email
        })
    }, []);

    useEffect(() => {
        if (!data.isAuth) {
            navigate('/login')
        }
    }, [data.isAuth])

    const onLogoutHandler = (e) => {
        e.preventDefault();
        // @ts-ignore
        const refreshToken = getCookie('refreshToken');
        const body = {
            "token": refreshToken
        };
        dispatch(logoutUser(body));
    };

    const defaultEdits = () => {
        setNameEdit(true);
        setLoginEdit(true);
        setPasswordEdit(true);
    };

    const cancelButtonHandler = (e) => {
        e.preventDefault();

        setInputs({
            ...inputs,
            name: data.user.name,
            login: data.user.email
        });
        defaultEdits();
    };

    const saveButtonHandler = (e) => {
        e.preventDefault();

        const body = {
          'name':  inputs.name,
          'login':  inputs.email,
        };
        dispatch(updateUser(body));
        defaultEdits();
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

                <div className={styles.login__form}>
                    <Input
                        type={'text'}
                        name={'name'}
                        placeholder={'Имя'}
                        onChange={e => setInputs({
                            ...inputs,
                            name: e.target.value
                        })}
                        error={false}
                        value={inputs.name}
                        onIconClick={() => setNameEdit(!nameEdit)}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                        size={'default'}
                        disabled={nameEdit}
                    />

                    <Input
                        type={'text'}
                        name={'login'}
                        placeholder={'Логин'}
                        onChange={e => setInputs({
                            ...inputs,
                            login: e.target.value
                        })}
                        error={false}
                        value={inputs.login}
                        onIconClick={() => setLoginEdit(!loginEdit)}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                        disabled={loginEdit}
                    />

                    <Input
                        type={'password'}
                        name={'password'}
                        placeholder={'Пароль'}
                        onChange={e => setInputs({
                            ...inputs,
                            password: e.target.value
                        })}
                        error={false}
                        value={inputs.password}
                        onIconClick={() => setPasswordEdit(!passwordEdit)}
                        icon={inputs.icon}
                        errorText={'Ошибка'}
                        disabled={passwordEdit}
                    />

                    <div className={`${styles.profile__buttons} mt-6`}>
                        <Button
                            type="primary"
                            size="big"
                            onClick={saveButtonHandler}
                        >
                            Сохранить
                        </Button>
                        <Button
                            type="primary"
                            size="big"
                            onClick={cancelButtonHandler}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>

            </section>
        </Layout>
    );
};