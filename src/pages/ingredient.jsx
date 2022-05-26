import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import Layout from "./layout";
import Modal from '../components/Modal/Modal';
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../services/actions/modal";

export const IngredientPage = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const item = useSelector(store => store.burgerIngredients.ingredients.find(e => e._id === id));

  useEffect(() => {
    if (item) {
      dispatch(openModal(item))
    }
  }, [item]);

  return (
    <Layout>
      <Modal headerTitle='Детали ингредиента'>
          <IngredientDetails/>
      </Modal>
    </Layout>
  );
};