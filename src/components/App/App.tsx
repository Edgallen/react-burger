import React, {useState, useEffect, useMemo} from 'react';
import styles from './App.module.css'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { ConstructorContext } from "../services/constructorContext";

const App = () => {
  const [data, setData] = useState({
    ingredients: [] as any,
    selectedIngredient: {},
    isLoading: false,
    hasError: false,
  });
  const contextValue = useMemo(
    () => ({ data, setData }), 
    [data]
  );

  const [orderModal, setOrderModal] = useState({
    isVisible: false,
    responseId: 0,
    idHasError: false,
    idIsLoading: true

  });
  const [ingredientsModal, setIngredientsModal] = useState({
    isVisible: false
  });

  useEffect(() => {
    setData({...data, isLoading: true, hasError: false})
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then((res) =>{
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Что-то пошло не так, статус ответа: ${res.status}`);
      })
      .then(data => setData({ ...data, isLoading: false, ingredients: data.data }))
      .catch(e => {
        setData({ ...data, hasError: true, isLoading: false});
        console.log(`Что-то пошло не так ${e}`);
      });
  }, []);


  const handleOrderSubmit = (e: any, orderId: any) => {
    e.preventDefault();

    const body = {
      'ingredients': orderId
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
    setData({...data, selectedIngredient: e})
  };

  const ingredientsCloseHandler = () => {
    setIngredientsModal({...ingredientsModal, isVisible: false});
  };

  return (
    <>
      <AppHeader />
      
      <main className={styles.body}>
          {!data.isLoading && !data.hasError && (
            <>
              <ConstructorContext.Provider value={contextValue}>
                  <BurgerIngredients
                      openModal={ingredientsOpenHandler}
                  />

                  <BurgerConstructor
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
              <IngredientDetails ingredient={data.selectedIngredient} />
            </Modal>
          )}
      </main>
    </>
  );
};

export default App;
