import {
  CHANGE_COUNT_TO,
  DECREMENT,
  INCREMENT,
  RESET,
} from '../actions/actionTypes';

const initialState = {
  count: 0,
};

export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case RESET:
      return {
        ...state,
        count: 0,
      };
    case CHANGE_COUNT_TO:
      return {
        ...state,
        count: Number.isNaN(action.payload) ? state.count : action.payload,
      };
    default:
      return state;
  }
}
