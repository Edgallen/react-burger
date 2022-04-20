import React from 'react';
import styles from './App.module.css'

import {ingredients, currentBurger} from '../../utils/data'

import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

class App extends React.Component {
  state = {
    ingredients: '',
    currentBurger: ''
  }

  componentWillMount() {
    this.setState({
      ingredients: ingredients,
      currentBurger: currentBurger
    })
  }

  

  render() {
    return (
      <>
        <AppHeader />
        
        <main className={styles.body}>
          <BurgerIngredients data={this.state.ingredients} />
          <BurgerConstructor orderList={this.state.currentBurger} />
        </main>
      </>
    );
  };
};

export default App;
