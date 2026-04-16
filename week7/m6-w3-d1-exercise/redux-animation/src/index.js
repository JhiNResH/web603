import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import Demo1 from './demo1/Demo1';
import Demo2 from './demo2/Demo2';
import Demo3 from './demo3/Demo3';
import { boxReducer } from './demo1/reducer';
import { fadeReducer } from './demo2/reducer';
import { listReducer } from './demo3/reducer';

const rootReducer = combineReducers({
  box: boxReducer,
  fade: fadeReducer,
  list: listReducer,
});

const store = createStore(rootReducer);

const navStyle = {
  padding: 12,
  borderBottom: '1px solid #ccc',
  marginBottom: 20,
  background: '#f5f5f5',
};

const linkStyle = {
  marginRight: 16,
  color: '#0366d6',
  textDecoration: 'none',
  fontWeight: 600,
};

function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Redux Animation Demos</h1>
      <p>Three Redux + React animation demos in one app.</p>
      <ul>
        <li>
          <Link to="/demo1">Demo 1 — Slide Box</Link>
        </li>
        <li>
          <Link to="/demo2">Demo 2 — Fade Toggle</Link>
        </li>
        <li>
          <Link to="/demo3">Demo 3 — List Transition</Link>
        </li>
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/demo1" style={linkStyle}>Demo 1</Link>
        <Link to="/demo2" style={linkStyle}>Demo 2</Link>
        <Link to="/demo3" style={linkStyle}>Demo 3</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo1" element={<Demo1 />} />
        <Route path="/demo2" element={<Demo2 />} />
        <Route path="/demo3" element={<Demo3 />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
