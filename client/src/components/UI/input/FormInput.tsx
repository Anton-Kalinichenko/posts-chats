import React from 'react';
import classes from './FormInput.module.css';

const FormInput = React.forwardRef((props: any, ref: any) => {
    return (
        <input {...props} ref={ref} className={classes.formInput} />
    );
});

export default FormInput;
