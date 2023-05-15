import React, { useMemo } from "react";
import styles from "./styles.module.scss";

const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  return (
    <div className={styles.footer}>
      <div className={styles.footer__content}>
        <p className={styles.footer__item}> Created by: Y.Pryhoda</p>
        <p className={styles.footer__item}> For: dZEN Studio</p>
        <p className={styles.footer__item}> In: {currentYear} year</p>
      </div>
    </div>
  );
};

export default Footer;

