import React, {FormEvent, useEffect, useState, FC} from "react";
import styles from './pages.module.css';
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "../utils/cookies";
import {updateUser} from "../services/actions/auth";
import {useAuth} from "../services/authProvider";
import {IProfileInputs, TAuth, TAuthBody} from "../types";
import {Outlet, useNavigate} from "react-router-dom";

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

const ProfileInputs: FC<IProfileInputs> = ({user}) => {
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

export const ProfilePage = () => {
    const data = useSelector((store: any) => store.auth);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();

    const requestAuth = useAuth();
    let auth: TAuth;
    if (requestAuth) {
        auth = requestAuth;
    }

    const onLogoutHandler = (e: FormEvent) => {
        e.preventDefault();
        const refreshToken = getCookie('refreshToken');
        const body = {
            "token": refreshToken
        };

        if ( auth !== null ) {
            auth.logOut(body);
        }
    };

    const handleProfileClick = () => {
        if (activeTab !== 'profile') {
            navigate(-1);
            setActiveTab('profile');
        }
    }

    const handleOrdersClick = () => {
        navigate('orders');
        setActiveTab('orders');
    }

    return (
        <>
            {data.isAuth && (
                <section className={styles.profile}>
                    <div className={`${styles.profile__selector} mr-15`}>
                        <div className={`${styles.profile__tabs} mb-20`}>
                            <h1 
                                className={`${styles.profile__tab} text text_type_main-medium ${activeTab === 'profile' ? '' : 'text_color_inactive'}`}
                                onClick={handleProfileClick}
                            >
                                Профиль
                            </h1>
                            <h1 
                                className={`${styles.profile__tab} text text_type_main-medium ${activeTab === 'orders' ? '' : 'text_color_inactive'}`}
                                onClick={handleOrdersClick}
                            >
                                История заказов
                            </h1>
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

                        {activeTab === 'profile'
                            ? (
                                <div className={styles.profile__edits}>
                                    {data.user && <ProfileInputs user={data.user}/>}
                                </div>
                            )
                            : (
                                <div className={styles.profile__orders}>
                                    <Outlet />
                                </div>
                            )
                        }

                </section>
            )}
        </>
    );
};