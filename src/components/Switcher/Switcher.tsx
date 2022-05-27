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

const Switcher = () => {
  let location = useLocation();
  let state = location.state as { backgroundLocation?: Location };

  return (
    <>

      <div>
        <Routes>
          <Route path='*' element={<AppHeader />} />
        </Routes>
      </div>

      <div className={styles.body}>
        <Routes>
          <Route path='/' element={<HomePage />}>
            {state?.backgroundLocation && (<Route path='ingredient/:id' element={<IngredientDetails/>} />)}
          </Route>

          <Route path='login' element={<LoginPage /> }/>

          <Route path='register' element={<RegisterPage /> }/>

          <Route path='forgot-password' element={<ForgotPasswordPage /> }/>

          <Route path='reset-password' element={<ResetPasswordPage /> }/>

          <Route path='profile' element={<ProfilePage /> }/>

          <Route path='ingredient/:id' element={<IngredientPage /> } />

          <Route path='*' element={<NotFoundPage /> } />

        </Routes>
      </div>
    </>
  )
}

export default Switcher;