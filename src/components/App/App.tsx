import React, {useEffect} from 'react';
import styles from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions/burgerIngredients";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';

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
          <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
          </DndProvider>
      </main>
    </>
  );
};

export default App;
