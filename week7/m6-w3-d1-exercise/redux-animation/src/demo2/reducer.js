// Demo 2 — fade in/out toggle
const initialState = { visible: true };

export function fadeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FADE/TOGGLE':
      return { visible: !state.visible };
    default:
      return state;
  }
}
