import React from "react";

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closeClick}) => {
    return (
        <div className={styles.modal__overlay} onClick={closeClick} ></div>
    );
};

export default ModalOverlay;