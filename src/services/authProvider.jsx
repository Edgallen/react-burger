import React from "react";
import {createContext, useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, logoutUser} from "./actions/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(store => store.auth.isAuth);

    const logIn = (body) => {
        dispatch(loginUser(body));
    };

    const logOut = (body) => {
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

export const RequireAuth = ({ children }) => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireLogIn = ({ children }) => {
    const isAuth = useSelector(store => store.auth.isAuth);
    const location = useLocation();

    if (isAuth) {
        return <Navigate to="/profile" state={{ path: location.pathname }} />
    }

    return children;
}

export const RequireReset = ({ children }) => {
    const data = useSelector(store => store.auth);
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