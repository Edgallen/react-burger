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
} from "react-router-dom";
import {
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage
} from '../../pages'

const App = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients())
  }, []);

  return (
    <>
      <AppHeader />
      
      <main className={styles.body}>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={
                      <DndProvider backend={HTML5Backend}>
                          <BurgerIngredients />
                          <BurgerConstructor />
                      </DndProvider>
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
          </BrowserRouter>
      </main>
    </>
  );
};

export default App;
