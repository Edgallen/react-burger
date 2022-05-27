import React, {useEffect} from 'react';
import styles from './App.module.css'

import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burgerIngredients";
import { BrowserRouter } from "react-router-dom";
import Switcher from '../Switcher/Switcher'
import { getUser, updateUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

const App = () => {
  const dispatch = useDispatch();

  // @ts-ignore
  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    // @ts-ignore
    dispatch(getIngredients());

    if (refreshToken) {
      // @ts-ignore
      dispatch(getUser());
    };
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
