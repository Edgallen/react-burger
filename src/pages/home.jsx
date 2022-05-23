
import Layout from "./layout"
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';

export const HomePage = () => {
  return (
    <Layout>
      <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
      </DndProvider>
    </Layout>
  )
};