import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

import styles from "./styles.module.scss";

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

