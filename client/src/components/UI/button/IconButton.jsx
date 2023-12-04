import React from 'react';
import classes from './IconButton.module.css';

const IconButton = ({children, ...props}) => {
    return (
        <div {...props} className={classes.iconBtn}>
            {children}
        </div>
    );
}

export default IconButton;
