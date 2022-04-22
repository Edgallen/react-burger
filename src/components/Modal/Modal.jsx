import React, {useEffect} from "react";
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({closeClick, children, headerTitle}) => {
    const closeHandler = React.useCallback((evt) => {
        if (evt.key === 'Escape') {
            closeClick();
        }
    }, [closeClick]);

    useEffect(() => {
        document.addEventListener('keydown', closeHandler);
        return () => {
            document.removeEventListener('keydown', closeHandler);
        };
    }, [closeHandler]);

    return(
        <section className={styles.modal}>
            <ModalOverlay closeClick={closeClick} /> 
            <div className={styles.modal__card}>

                <div className={styles.modal__content + ' mr-10 ml-10 mt-10'}>
                    <div>
                        {headerTitle && <h1 className="text text_type_main-large">{headerTitle}</h1>}
                    </div>
                    <button className={styles.modal__closeButton} onClick={closeClick}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                {children}

            </div>
        </section>
    );
};

Modal.propTypes = {
    closeClick: PropTypes.func.isRequired,
    headerTitle: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]).isRequired,
    children: PropTypes.node.isRequired
}

export default Modal;