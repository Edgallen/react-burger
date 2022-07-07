import React, {FormEvent, useEffect, useState} from "react";
import styles from './pages.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch, useAppSelector} from "../utils/hooks";
import {updateUser} from "../services/actions/auth";
import {TAuthBody} from "../types";

type TInputs = {
    name: string | undefined;
    login: string | undefined;
    password: string;
    editing: boolean;
};

export const ProfileEditingPage = () => {
    const user = useAppSelector((store) => store.auth.user);
    const dispatch = useAppDispatch();

    const [nameEdit, setNameEdit] = useState(true)
    const [loginEdit, setLoginEdit] = useState(true)
    const [passwordEdit, setPasswordEdit] = useState(true)
    const [inputs, setInputs] = useState<TInputs>({
        name: '',
        login: '',
        password: '',
        editing: false
    });

    useEffect(() => {
        setInputs({
            ...inputs,
            name: user.name,
            login: user.email
        })
    }, []);


    const defaultEdits = (name?: string, login?: string) => {
        setNameEdit(true);
        setLoginEdit(true);
        setPasswordEdit(true);

        if (name && login) {
            setInputs({
                ...inputs,
                name: user.name,
                login: user.email,
                editing: false
            });
            return
        }
        setInputs({...inputs, editing: false});
    };

    const cancelButtonHandler = (e: FormEvent) => {
        e.preventDefault();
        defaultEdits(user.name, user.email);
    };

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        let body: TAuthBody = {
            'name':  inputs.name,
            'login':  inputs.login,
        };

        if (inputs.password !== '') {
            body = {
                ...body,
                'password': inputs.password
            };
        }

        dispatch(updateUser(body));
        defaultEdits();
    };
    return (
        <form className={styles.login__form} onSubmit={onSubmitHandler}>
            <Input
                type={'text'}
                name={'name'}
                placeholder={'Имя'}
                onChange={e => setInputs({
                    ...inputs,
                    name: e.target.value
                })}
                error={false}
                value={inputs.name!}
                onIconClick={() => {
                    setNameEdit(!nameEdit);
                    setInputs({...inputs, editing: true});
                }}
                icon={nameEdit ? 'EditIcon' : 'CloseIcon'}
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
                value={inputs.login!}
                onIconClick={() => {
                    setLoginEdit(!loginEdit);
                    setInputs({...inputs, editing: true});
                }}
                icon={loginEdit ? 'EditIcon' : 'CloseIcon'}
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
                onIconClick={() => {
                    setPasswordEdit(!passwordEdit);
                    setInputs({...inputs, editing: true});
                }}
                icon={passwordEdit ? 'EditIcon' : 'CloseIcon'}
                errorText={'Ошибка'}
                disabled={passwordEdit}
            />

            {inputs.editing && (
                <div className={`${styles.profile__buttons} mt-6`}>
                    <Button
                        type="secondary"
                        size="large"
                        onClick={cancelButtonHandler}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    )
}
