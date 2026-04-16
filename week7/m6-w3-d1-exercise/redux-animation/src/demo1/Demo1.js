import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const trackStyle = {
  width: '100%',
  height: 100,
  background: '#eee',
  border: '1px solid #ccc',
  borderRadius: 4,
  position: 'relative',
  marginTop: 20,
  overflow: 'hidden',
};

const boxStyle = (position) => ({
  width: 80,
  height: 80,
  background: '#0366d6',
  borderRadius: 4,
  position: 'absolute',
  top: 10,
  left: position === 'left' ? 10 : 'calc(100% - 90px)',
  transition: 'left 0.6s ease-in-out',
});

export default function Demo1() {
  const position = useSelector((state) => state.box.position);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Demo 1 — Slide Box</h2>
      <p>Click a button to dispatch a Redux action and animate the box position.</p>
      <button onClick={() => dispatch({ type: 'BOX/MOVE_LEFT' })}>Move Left</button>{' '}
      <button onClick={() => dispatch({ type: 'BOX/MOVE_RIGHT' })}>Move Right</button>
      <div style={trackStyle}>
        <div style={boxStyle(position)} />
      </div>
    </div>
  );
}
