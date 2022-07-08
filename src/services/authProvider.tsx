import React, {FC} from "react";
import {createContext, useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {loginUser, logoutUser} from "./actions/auth";
import {
    TAuthBody,
    IAppContextInterface,
    IAuthProvider
} from "../types";

const AuthContext = createContext<IAppContextInterface | null>(null);

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector((store) => store.auth.isAuth);

    const logIn = (body: TAuthBody) => {
        dispatch(loginUser(body));
    };

    const logOut = (body: TAuthBody) => {
        dispatch(logoutUser(body));
    };

    return (
        <AuthContext.Provider value={{isAuth, logIn, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export const RequireAuth: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const isAuth = useAppSelector((store) => store.auth.isAuth);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireLogIn: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const isAuth = useAppSelector((store) => store.auth.isAuth);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/profile" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireReset: ({children}: { children: JSX.Element }) => (JSX.Element) = ({ children }) => {
    const data = useAppSelector((store) => store.auth);
    const location = useLocation();

    if (!data.isForgot) {
        return (
            <Navigate
                to={data.isAuth === true ? '/profile' : '/login'}
                state={{ path: location.pathname }}
            />
        )
    }

    return children;
}