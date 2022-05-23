import styles from '../components/App/App.module.css'

import React from "react";
import AppHeader from "../components/AppHeader/AppHeader";

const Layout = (props) => {
  return (
    <>
      <AppHeader />

      <main className={styles.body}>
        {props.children}
      </main>
    </>
  )
}

export default Layout;