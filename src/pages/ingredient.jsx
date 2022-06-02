import React, { useEffect } from "react";
import styles from './pages.module.css';
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredient } from "../services/actions/modal";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const item = useSelector(store => store.burgerIngredients.ingredients.find(e => e._id === id));

  useEffect(() => {
    if (item) {
      dispatch(selectIngredient(item))
    }
  }, [item]);

  return (
    <>
      <div className={styles.ingredient}>
          <h1 className='text text_type_main-large' >Детали ингредиента</h1>
          <IngredientDetails/>
      </div>
    </>
  );
};