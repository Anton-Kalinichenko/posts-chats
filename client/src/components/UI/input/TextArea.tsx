import React from 'react';
import cl from './TextArea.module.css';

const TextArea = React.forwardRef((props: any, ref: any) => {
    return (
        <textarea {...props} ref={ref} className={cl.textArea} />
    );
});

export default TextArea;
