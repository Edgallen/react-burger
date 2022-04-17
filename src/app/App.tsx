import React from 'react';
import styles from './App.module.css'

import getData from '../utils/data'

import AppHeader from '../components/AppHeader/AppHeader';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

class App extends React.Component {
  state = {
    menu: getData(),
    orderList: [
      getData()[0],
      getData()[3],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[1],
      getData()[0]
    ]
  }

  render() {
    return (
      <>
        <header className={styles.header}>
          <AppHeader />
        </header>
        <section className={styles.body}>
          <BurgerIngredients data={this.state.menu} />
          <BurgerConstructor orderList={this.state.orderList} />
        </section>
      </>
    );
  };
};

export default App;
