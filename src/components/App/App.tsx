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
    selectedIngredient: {},
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
      .then((res) =>{
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
      })
      .then(data => setState({ ...state, isLoading: false, ingredients: data.data }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false});
        console.log(`Что-то пошло не так ${e}`);
      });
  }, []);


  const orderOpenHandler = () => {
    setOrderModal({...state, isVisible: true});
  };

  const orderCloseHandler = () => {
    setOrderModal({...state, isVisible: false});
  };

  const ingredientsOpenHandler = (e: any) => {
    setIngredientsModal({...state, isVisible: true});
    setState({...state, selectedIngredient: e})
  };

  const ingredientsCloseHandler = () => {
    setIngredientsModal({...state, isVisible: false});
  };

  return (
    <>
      <AppHeader />
      
      <main className={styles.body}>
        {!state.isLoading && !state.hasError && (
          <BurgerIngredients
            data={state.ingredients}
            openModal={ingredientsOpenHandler}
          />
        )}

        {!state.isLoading && !state.hasError && (
        <BurgerConstructor
          orderList={state.ingredients}
          openModal={orderOpenHandler}
        />)}

        {orderModal.isVisible && (
          <Modal closeModal={orderCloseHandler} headerTitle={false}>
            <OrderDetails />
          </Modal>
        )}

        {ingredientsModal.isVisible && (
          <Modal closeModal={ingredientsCloseHandler} headerTitle='Детали ингредиента'>
            <IngredientDetails ingredient={state.selectedIngredient} />
          </Modal>
        )}
      </main>
    </>
  );
};

export default App;
