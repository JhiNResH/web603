export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const CHANGE_COUNT_TO = 'CHANGE_COUNT_TO';

export const increment = () => {
  return (dispatch) => {
    dispatch({ type: INCREMENT });
  };
};

export const decrement = () => {
  return (dispatch) => {
    dispatch({ type: DECREMENT });
  };
};

export const reset = () => {
  return (dispatch) => {
    dispatch({ type: RESET });
  };
};

export const changeCountTo = (count) => {
  return (dispatch) => {
    dispatch({
      type: CHANGE_COUNT_TO,
      payload: Number(count),
    });
  };
};
