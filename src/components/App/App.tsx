import React, {useEffect} from 'react';

import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burgerIngredients";
import { BrowserRouter } from "react-router-dom";
import Switcher from '../Switcher/Switcher'
import { getUser } from '../../services/actions/auth';
import { getCookie } from '../../utils/cookies';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const refreshToken = getCookie('refreshToken');
    dispatch(getIngredients() as any);

    if (refreshToken) {
      dispatch(getUser() as any);
    }
  }, []);

  return (
      <BrowserRouter>
          <Switcher />
      </BrowserRouter>
  );
};

export default App;
