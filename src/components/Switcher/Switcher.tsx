import React from "react";
import styles from './Switcher.module.css'
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage
} from '../../pages'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppHeader from "../AppHeader/AppHeader";
import {AuthProvider, RequireAuth, RequireLogIn, RequireReset} from "../../services/authProvider";
import { useSelector } from "react-redux";

const Switcher = () => {
  const location = useLocation();
  // @ts-ignore
  const background = location.state && location.state.background;
  // @ts-ignore
  const ingredientModal = useSelector(store => store.modal.ingredientModal.isVisible)

  return (
    <AuthProvider>
        <Routes>
          <Route path='*' element={<AppHeader />} />
        </Routes>

      <main className={styles.body}>
        <Routes location={location || background}>
          <Route path='/' element={<HomePage />}>
            {background && ingredientModal && (<Route path='ingredient/:id' element={<IngredientDetails />} />)}
          </Route>

          <Route path='login' element={
            <RequireLogIn>
              <LoginPage />
            </RequireLogIn>
          }/>

          <Route path='register' element={
             <RequireLogIn>
                <RegisterPage />
             </RequireLogIn>
          }/>

          <Route path='forgot-password' element={<ForgotPasswordPage /> }/>

          <Route path='reset-password' element={
            <RequireReset>
              <ResetPasswordPage />
            </RequireReset>
          }/>

          <Route path='profile' element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }/>

          <Route path='ingredient/:id' element={<IngredientPage /> } />

          <Route path='*' element={<NotFoundPage /> } />

        </Routes>
      </main>
    </AuthProvider>
  )
}

export default Switcher;