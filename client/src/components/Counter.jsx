import React, { useState } from 'react';
import SimpleButton from './UI/button/SimpleButton';

const Counter = function() {
    const [count, setCount] = useState(0);

    function increment() {
        setCount(count + 1);
      }

      function decrement() {
        setCount(count - 1);
      }

    return (
        <div>
            <h3 style={{margin: '0 1rem',}}>{count}</h3>
            <SimpleButton onClick={increment}>Increment</SimpleButton>
            <SimpleButton onClick={decrement}>Decrement</SimpleButton>
        </div>
    );
}

export default Counter;
