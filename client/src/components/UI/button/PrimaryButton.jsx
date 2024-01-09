import React from 'react';
import cl from './PrimaryButton.module.css';

const PrimaryButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.primaryBtn}>
            {children}
        </button>
    );
}

export default PrimaryButton;
