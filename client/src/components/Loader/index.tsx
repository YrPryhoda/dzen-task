import React from "react";
import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__square}></div>
      <p>Loading ...</p>
    </div>
  );
};

export default Loader;

