import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const cardStyle = (visible) => ({
  width: 240,
  padding: 20,
  marginTop: 20,
  background: '#28a745',
  color: '#fff',
  borderRadius: 8,
  textAlign: 'center',
  opacity: visible ? 1 : 0,
  transform: visible ? 'translateY(0)' : 'translateY(-20px)',
  transition: 'opacity 0.5s ease, transform 0.5s ease',
});

export default function Demo2() {
  const visible = useSelector((state) => state.fade.visible);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: 20 }}>
      <h2>Demo 2 — Fade Toggle</h2>
      <p>Toggle a Redux boolean to fade and slide a card.</p>
      <button onClick={() => dispatch({ type: 'FADE/TOGGLE' })}>
        {visible ? 'Hide' : 'Show'}
      </button>
      <div style={cardStyle(visible)}>I fade and slide via Redux state</div>
    </div>
  );
}
