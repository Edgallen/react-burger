import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from 'react-dnd-html5-backend';

export const HomePage = () => {
  return (
      <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
      </DndProvider>
  )
};