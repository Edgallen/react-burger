import React, {useEffect} from 'react';
import styles from './App.module.css'

import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/burgerIngredients";
import { BrowserRouter } from "react-router-dom";
import Switcher from '../Switcher/Switcher'
import { getUser } from '../../services/actions/auth';

const App = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const userData = useSelector(store => store.auth)

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    dispatch(getIngredients());
    // @ts-ignore
    dispatch(getUser());
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
