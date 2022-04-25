import React from "react";
import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closeModal}) => {
    return (
        <div className={styles.modal__overlay} onClick={closeModal} ></div>
    );
};

ModalOverlay.prototypes = {
    closeModal: PropTypes.func.isRequired
};

export default ModalOverlay;