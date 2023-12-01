import React from 'react';
import SimpleButton from './UI/button/SimpleButton';

class ClassCounter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment() {
        this.setState({count: this.state.count + 1});
    }

    decrement() {
        this.setState({count: this.state.count - 1});
    }

    render() {
        return (
            <div>
                <h3 style={{margin: '0 1rem',}}>{this.state.count}</h3>
                <SimpleButton onClick={this.increment}>Increment</SimpleButton>
                <SimpleButton onClick={this.decrement}>Decrement</SimpleButton>
            </div>
        );
    }
}

export default ClassCounter;
