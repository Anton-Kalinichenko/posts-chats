import React from 'react';
import classes from './SimpleButton.module.css';

const SimpleButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.simpleBtn}>
            {children}
        </button>
    );
}

export default SimpleButton;
