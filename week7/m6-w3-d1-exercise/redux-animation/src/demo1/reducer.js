// Demo 1 — slide box left/right
const initialState = { position: 'left' };

export function boxReducer(state = initialState, action) {
  switch (action.type) {
    case 'BOX/MOVE_LEFT':
      return { position: 'left' };
    case 'BOX/MOVE_RIGHT':
      return { position: 'right' };
    default:
      return state;
  }
}
