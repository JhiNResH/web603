import React from 'react';
import { connect } from 'react-redux';

class Counter extends React.Component {
  increment = () => {
    this.props.dispatch({ type: 'INCREMENT' });
  };

  decrement = () => {
    this.props.dispatch({ type: 'DECREMENT' });
  };

  reset = () => {
    this.props.dispatch({ type: 'RESET' });
  };

  render() {
    return (
      <div className="container mt-4">
        <h2>Counter</h2>
        <div className="bg-info text-white p-3 d-flex align-items-center">
          <span className="h3 mr-3 mb-0">{this.props.count}</span>
          <button className="btn btn-light mr-2" onClick={this.decrement}>-</button>
          <button className="btn btn-light mr-2" onClick={this.increment}>+</button>
          <button className="btn btn-warning" onClick={this.reset}>reset</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { count: state.count };
}

export default connect(mapStateToProps)(Counter);
