import React from 'react';
import cl from './SecondaryButton.module.css';

const SecondaryButton = ({children, ...props}) => {
    return (
        <button {...props} className={cl.secondaryBtn}>
            {children}
        </button>
    );
}

export default SecondaryButton;
