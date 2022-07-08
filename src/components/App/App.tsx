import React, {useEffect} from 'react';
import { useAppDispatch } from '../../utils/hooks';
import {getIngredients} from "../../services/actions/burgerIngredients";
import { BrowserRouter } from "react-router-dom";
import Switcher from '../Switcher/Switcher'
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    dispatch(getIngredients());

    if (refreshToken) {
      dispatch(getUser());
    }
  }, []);

  return (
      <BrowserRouter>
          <Switcher />
      </BrowserRouter>
  );
};

export default App;
