import React from 'react';
import cl from './ConfirmationModal.module.css';
import IconButton from '../button/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PrimaryButton from '../button/PrimaryButton';
import SecondaryButton from '../button/SecondaryButton';

const ConfirmationModal = ({
    visible,
    setVisible,
    title,
    content,
    confirmAction
}) => {
    const rootClasses = [cl.modal];

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.modalContainer} onClick={(e) => e.stopPropagation()}>
                <div className={cl.modalHeader}>
                    <h4>{title}</h4>
                    <IconButton
                        title="Close"
                        style={{color: 'black', marginLeft: 'auto',}}
                    >
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setVisible(false)}
                            style={{width: 20, height: 20, margin: '0 0.5rem', cursor: 'pointer',}}
                        />
                    </IconButton>
                </div>
                <div className={cl.modalContent}>
                    <h4>{content}</h4>
                </div>
                <div className={cl.modalFooter}>
                    <SecondaryButton
                        className={cl.modalBtn}
                        style={{marginLeft: 'auto',}}
                        onClick={() => setVisible(false)}
                    >
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className={cl.modalBtn}
                        onClick={confirmAction}
                    >
                        Ok
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
