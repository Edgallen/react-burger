import React, {useEffect} from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({closeModal, children, headerTitle}) => {

    const handleEscape = React.useCallback((evt) => {
        if (evt.key === 'Escape') {
            closeModal();
        }
    }, [closeModal]);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [handleEscape]);

    return ReactDOM.createPortal(
        <section className={styles.modal}>
            <ModalOverlay closeModal={closeModal} />
            <div className={styles.modal__card}>

                <div className={styles.modal__content + ' mr-10 ml-10 mt-10'}>
                    <div>
                        {headerTitle && <h1 className="text text_type_main-large">{headerTitle}</h1>}
                    </div>
                    <button className={styles.modal__closeButton} onClick={closeModal}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                {children}

            </div>
        </section>, document.getElementById('modals')
    );
};

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    headerTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired
};

export default Modal;