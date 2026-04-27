import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  changeCountTo,
  decrement,
  increment,
  reset,
} from './actions/actionTypes';
import './styles.css';

function Count(props) {
  const [changeCount, setChangeCount] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.changeCountTo(changeCount);
    setChangeCount(0);
  };

  return (
    <main className="page-shell">
      <section className="counter-panel" aria-labelledby="counter-title">
        <div>
          <p className="eyebrow">Module 6 Week 4 Day 1</p>
          <h1 id="counter-title">Redux Thunk Counter</h1>
        </div>

        <p className="count-label">Current Count</p>
        <p className="count-value">{props.count}</p>

        <div className="button-row" aria-label="Counter controls">
          <button type="button" onClick={props.decrement}>
            -
          </button>
          <button type="button" onClick={props.increment}>
            +
          </button>
          <button type="button" onClick={props.reset}>
            Reset
          </button>
        </div>

        <form className="jump-form" onSubmit={handleSubmit}>
          <label htmlFor="change-count">Set count to</label>
          <div className="input-row">
            <input
              id="change-count"
              type="number"
              value={changeCount}
              onChange={(event) => setChangeCount(event.target.value)}
            />
            <button type="submit">Apply</button>
          </div>
        </form>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
  };
};

const mapDispatchToProps = {
  increment,
  decrement,
  reset,
  changeCountTo,
};

export default connect(mapStateToProps, mapDispatchToProps)(Count);
