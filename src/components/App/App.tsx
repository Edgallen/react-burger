import React, {useEffect} from 'react';
import styles from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burgerIngredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
    BrowserRouter,
    Routes,
    Route,
    Router,
} from "react-router-dom";
import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage
} from '../../pages'
import Switcher from '../Switcher/Switcher'

const App = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients())
  }, []);

  return (
    <>
        <BrowserRouter>
            <Switcher />
        </BrowserRouter>
    </>
  );
};

export default App;
