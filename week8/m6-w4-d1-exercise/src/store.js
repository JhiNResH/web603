import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './reducers/counterReducer';

const middleware = [thunk];
const store = createStore(counterReducer, applyMiddleware(...middleware));

export default store;
