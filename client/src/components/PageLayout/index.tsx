import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.scss";
import Header from "../Header";
import Footer from "../Footer";


const PageLayout = () => {
  return (
    <div>
      <Header />
      <main className={styles.page}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;

