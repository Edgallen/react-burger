import React from "react";
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage
} from '../../pages'

const Switcher = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={
            <HomePage />
        }/>

        <Route path='/login' element={
            <LoginPage />
        }/>

        <Route path='/register' element={
            <RegisterPage />
        }/>

        <Route path='/forgot-password' element={
            <ForgotPasswordPage />
        }/>

        <Route path='/reset-password' element={
            <ResetPasswordPage />
        }/>

        <Route path='/profile' element={
            <ProfilePage />
        }/>
      </Routes>
    </>
  )
}

export default Switcher;