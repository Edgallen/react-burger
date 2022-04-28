import React, {useState, useEffect} from 'react';
import styles from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ConstructorContext } from "../services/constructorContext";

const App = () => {
  const [state, setState] = useState({
    ingredients: [] as any,
    selectedIngredient: {},
    isLoading: false,
    hasError: false
  });
  const [orderModal, setOrderModal] = useState({
    isVisible: false,
    responseId: 0,
    idHasError: false,
    idIsLoading: true

  });
  const [ingredientsModal, setIngredientsModal] = useState({
    isVisible: false
  });
  const [cart, setCart] = useState({
    total: 0,
    orderId: null,
  });

  useEffect(() => {
    setState({...state, isLoading: true, hasError: false})
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((res) =>{
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
      })
      .then(data => setState({ ...state, isLoading: false, ingredients: data.data }))
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false});
        console.log(`Что-то пошло не так ${e}`);
      });
  }, []);


  const handleOrderSubmit = (e: any) => {
    e.preventDefault();

    const body = {
      'ingredients': cart.orderId
    }

    fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Что-то пошло не так, статус ответа: ${res}`);
        })
        .then(data => {
          setOrderModal({...orderModal, isVisible: true, responseId: data.order.number, idIsLoading: false})
        })
        .catch(e => {
          setOrderModal({ ...orderModal, idHasError: true, idIsLoading: false});
          console.log(`Что-то пошло не так ${e}`);
        });
  }

  const orderCloseHandler = () => {
    setOrderModal({...orderModal, isVisible: false});
  };

  const ingredientsOpenHandler = (e: any) => {
    setIngredientsModal({...ingredientsModal, isVisible: true});
    setState({...state, selectedIngredient: e})
  };

  const ingredientsCloseHandler = () => {
    setIngredientsModal({...ingredientsModal, isVisible: false});
  };

  return (
    <>
      <AppHeader />
      
      <main className={styles.body}>
          {!state.isLoading && !state.hasError && (
            <>
              <ConstructorContext.Provider value={{ cart, setCart}}>
                  <BurgerIngredients
                      data={state.ingredients}
                      openModal={ingredientsOpenHandler}
                  />

                  <BurgerConstructor
                      orderList={state.ingredients}
                      handleSubmit={handleOrderSubmit}
                  />
              </ConstructorContext.Provider>
            </>
          )}

          {orderModal.isVisible && (
            <Modal closeModal={orderCloseHandler} headerTitle={false}>
              <OrderDetails orderModal={orderModal} />
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
