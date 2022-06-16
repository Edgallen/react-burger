import React, {useEffect, FC} from "react";
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IModal } from "../../types";

const Modal: FC<IModal> = ({children, headerTitle, closeHandler}) => {
    const handleEscape = React.useCallback((evt: { key: string; }) => {
        if (evt.key === 'Escape') {
            closeHandler();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [handleEscape]);

    return ReactDOM.createPortal(
        <section className={styles.modal}>
            <ModalOverlay closeModal={closeHandler} />
            <div className={styles.modal__card}>

                <div className={styles.modal__content + ' mr-10 ml-10 mt-10'}>
                    <div>
                        {headerTitle && <h1 className="text text_type_main-large">{headerTitle}</h1>}
                    </div>
                    <button className={styles.modal__closeButton} onClick={closeHandler}>
                        <CloseIcon type="primary" />
                    </button>
                </div>

                {children}

            </div>
        </section>, document.getElementById('modals')!
    );
};

export default Modal;