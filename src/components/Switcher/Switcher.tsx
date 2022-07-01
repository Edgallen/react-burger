import React from "react";
import styles from './Switcher.module.css'
import {
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFoundPage,
  FeedPage,
  OrderPage
} from '../../pages'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppHeader from "../AppHeader/AppHeader";
import {AuthProvider, RequireAuth, RequireLogIn, RequireReset} from "../../services/authProvider";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal/Modal";
import { closeModal } from "../../services/actions/modal";

const Switcher = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const background = location.state && location.state.background;
  const ingredientModal = useSelector((store: any) => store.modal.ingredientModal.isVisible)

  const closeIngredientModal = () => {
    dispatch(closeModal());

    navigate('/');
  };

  return (
    <AuthProvider>
        <Routes>
          <Route path='*' element={<AppHeader />} />
        </Routes>

      <main className={styles.body}>
        <Routes location={location || background}>
          <Route path='/' element={<HomePage />}>
            {background && ingredientModal && (
              <Route path='ingredient/:id' element={
                <Modal 
                  headerTitle='Детали ингредиента'
                  closeHandler={closeIngredientModal}
                >
                  <IngredientDetails />
                </Modal>
              } />
            )}
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

          <Route path="feed" element={<FeedPage />} />

          <Route path='ingredient/:id' element={<IngredientPage /> } />
          <Route path='feed/:id' element={<OrderPage /> } />

          <Route path='*' element={<NotFoundPage /> } />

        </Routes>
      </main>
    </AuthProvider>
  )
}

export default Switcher;