import React, { useEffect } from "react";
import styles from "./styles.module.scss";

interface IProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: IProps) => {
  useEffect(() => {
    document.body.classList.add(styles.stopScroll);

    return () => {
      document.body.classList.remove(styles.stopScroll);
    };
  }, []);
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__controls}>
          <button onClick={onClose} className={styles.modal__btn}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

