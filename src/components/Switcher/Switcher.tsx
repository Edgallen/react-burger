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
  IngredientPage,
  NotFoundPage,
  FeedPage,
  OrderPage,
  ProfileEditingPage,
  ProfileFeedPage
} from '../../pages'
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import AppHeader from "../AppHeader/AppHeader";
import {AuthProvider, RequireAuth, RequireLogIn, RequireReset} from "../../services/authProvider";
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import Modal from "../Modal/Modal";
import { closeModal } from "../../services/actions/modal";
import { ProfileLayout } from "../ProfileLayout/ProfileLayout";
import FeedDetails from "../FeedDetails/FeedDetails";

const Switcher = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location: any = useLocation();
  const background = location.state && location.state.background;
  const modals = useAppSelector((store) => store.modal)

  const closeIngredientModal = () => {
    dispatch(closeModal());
    navigate('/');
  };

  const closeFeedModal = () => {
    dispatch(closeModal());
    navigate('/feed');
  };

  const closeProfileModal = () => {
    dispatch(closeModal());
    navigate('/profile/orders');
  };

  return (
    <AuthProvider>
        <Routes>
          <Route path='*' element={<AppHeader />} />
        </Routes>

      <main className={styles.body}>
        <Routes location={location || background}>
          <Route path='/' element={<HomePage />}>
            {background && modals.ingredientModal.isVisible && (
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

          <Route path='login' element={<RequireLogIn><LoginPage /></RequireLogIn>}/>

          <Route path='register' element={ <RequireLogIn><RegisterPage /></RequireLogIn>}/>

          <Route path='forgot-password' element={<ForgotPasswordPage /> }/>

          <Route path='reset-password' element={<RequireReset><ResetPasswordPage /></RequireReset>}/>

          <Route path='profile' element={<RequireAuth><ProfileLayout /></RequireAuth>}>
            <Route index element={<ProfileEditingPage />} />
            <Route path='orders' element={<ProfileFeedPage/>}>
              {background && modals.feedModal.isVisible && (
                <Route path=':id' element={
                  <Modal 
                    closeHandler={closeProfileModal}
                  >
                    <FeedDetails type='modal' />
                  </Modal>
                } />
              )}
            </Route>
          </Route>

          <Route path="feed" element={<FeedPage />}>
            {background && modals.feedModal.isVisible && (
              <Route path=':id' element={
                <Modal 
                  closeHandler={closeFeedModal}
                >
                  <FeedDetails type='modal' />
                </Modal>
              } />
            )}
          </Route>

          <Route path='ingredient/:id' element={<IngredientPage /> } />
          <Route path='feed/:id' element={<OrderPage /> } />
          <Route path='profile/orders/:id' element={<OrderPage /> } />

          <Route path='*' element={<NotFoundPage /> } />

        </Routes>
      </main>
    </AuthProvider>
  )
}

export default Switcher;