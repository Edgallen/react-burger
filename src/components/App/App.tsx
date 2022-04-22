import React, {useState, useEffect} from 'react';
import styles from './App.module.css'

import {data} from '../../utils/data'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App = () => {
  const [state, setState] = useState({
    ingredients: [] as any,
    isLoading: false,
    hasError: false
  });
  const [orderModal, setOrderModal] = useState({
    isVisible: false
  })
  const [ingredientsModal, setIngredientsModal] = useState({
    isVisible: false
  })

  useEffect(() => {
    setState({...state, isLoading: true, hasError: false})
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then(data => setState({ ...state, isLoading: false, ingredients: data.data }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false});
        console.log(`Что-то пошло не так ${e}`);
      });
  }, []);


  const orderOpenHandler = () => {
    setOrderModal({...state, isVisible: true})
  };

  const orderCloseHandler = () => {
    setOrderModal({...state, isVisible: false})
  };

  const ingredientsOpenHandler = () => {
    setIngredientsModal({...state, isVisible: true})
  };

  const ingredientsCloseHandler = () => {
    setIngredientsModal({...state, isVisible: false})
  };

  return (
    <>
      <AppHeader />
      
      <main className={styles.body}>
        {!state.isLoading && !state.hasError && (
          <BurgerIngredients
            data={state.ingredients}
            openClick={ingredientsOpenHandler}
          />
        )}

        {!state.isLoading && !state.hasError && (
        <BurgerConstructor
          orderList={state.ingredients}
          openClick={orderOpenHandler}
        />)}

        {orderModal.isVisible && (
          <Modal closeClick={orderCloseHandler} headerTitle={false}>
            <OrderDetails />
          </Modal>
        )}

        {ingredientsModal.isVisible && (
          <Modal closeClick={ingredientsCloseHandler} headerTitle='Детали ингредиента'>
            <IngredientDetails ingredient={state.ingredients[4]} />
          </Modal>
        )}
      </main>
    </>
  );
};

export default App;
