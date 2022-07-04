import React, {FormEvent, useEffect, useState, FC} from "react";
import styles from './pages.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch} from "react-redux";
import {updateUser} from "../services/actions/auth";
import {IProfileInputs, TAuthBody} from "../types";

declare module 'react' {
    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
    }
}

type TInputs = {
    name: string;
    login: string;
    password: string;
    icon: any;
    editing: boolean;
};

export const ProfileInputs: FC<IProfileInputs> = ({user}) => {
    const dispatch = useDispatch();

    const [nameEdit, setNameEdit] = useState(true)
    const [loginEdit, setLoginEdit] = useState(true)
    const [passwordEdit, setPasswordEdit] = useState(true)
    const [inputs, setInputs] = useState<TInputs>({
        name: '',
        login: '',
        password: '',
        icon: 'EditIcon',
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

        dispatch(updateUser(body) as any);
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
                value={inputs.name}
                onIconClick={() => {
                    setNameEdit(!nameEdit);
                    setInputs({...inputs, editing: true});
                }}
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
                onIconClick={() => {
                    setLoginEdit(!loginEdit);
                    setInputs({...inputs, editing: true});
                }}
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
                onIconClick={() => {
                    setPasswordEdit(!passwordEdit);
                    setInputs({...inputs, editing: true});
                }}
                icon={inputs.icon}
                errorText={'Ошибка'}
                disabled={passwordEdit}
            />

            {inputs.editing && (
                <div className={`${styles.profile__buttons} mt-6`}>
                    <Button
                        type="primary"
                        size="large"
                    >
                        Сохранить
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={cancelButtonHandler}
                    >
                        Отмена
                    </Button>
                </div>
            )}
        </form>
    )
}
