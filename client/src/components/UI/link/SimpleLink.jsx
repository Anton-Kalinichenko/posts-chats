import React from 'react';
import cl from './SimpleLink.module.css';

const SimpleLink = ({children, ...props}) => {
    return (
        <a
            type="button"
            {...props}
            className={`${cl.simpleLink} ${props.active ? cl.active : ''}`}
            disabled={props.active}
            onClick={() => props.moveTo(props.args)}
        >
            {children}
        </a>
    );
}

export default SimpleLink;
