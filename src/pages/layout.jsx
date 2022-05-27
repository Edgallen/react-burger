import React from "react";
import styles from '../components/App/App.module.css'
import AppHeader from "../components/AppHeader/AppHeader";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <AppHeader />

      <main className={styles.body}>
        <Outlet />
      </main>
    </>
  )
}

export default Layout;