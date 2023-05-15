import React from "react";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";
import { routes } from "../../router/routes";

const Header = () => {
  return (
    <div className={styles.header}>
      <NavLink to={routes.home}>
        <div className={styles.header__logo}> dZEN Test Task</div>
      </NavLink>
    </div>
  );
};

export default Header;

