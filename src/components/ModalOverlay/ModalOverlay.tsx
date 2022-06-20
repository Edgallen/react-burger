import React, { FC } from "react";
import styles from './ModalOverlay.module.css';
import { IModalOverlay } from "../../types";

const ModalOverlay: FC<IModalOverlay> = ({closeModal}) => {
    return (
        <div className={styles.modal__overlay} onClick={closeModal} ></div>
    );
};

export default ModalOverlay;