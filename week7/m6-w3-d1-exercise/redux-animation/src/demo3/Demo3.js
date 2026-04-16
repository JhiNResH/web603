import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './demo3.css';

export default function Demo3() {
  const items = useSelector((state) => state.list.items);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Demo 3 — List Transition</h2>
      <p>Add or remove list items — each item fades and slides via react-transition-group.</p>
      <button onClick={() => dispatch({ type: 'LIST/ADD' })}>Add Item</button>
      <TransitionGroup component="ul" className="anim-list">
        {items.map((item) => (
          <CSSTransition key={item.id} timeout={400} classNames="fade">
            <li className="anim-item">
              {item.label}
              <button
                style={{ marginLeft: 12 }}
                onClick={() => dispatch({ type: 'LIST/REMOVE', id: item.id })}
              >
                Remove
              </button>
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
