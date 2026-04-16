// Demo 3 — animated list (add/remove items with transition)
const initialState = {
  items: [{ id: 1, label: 'Item 1' }, { id: 2, label: 'Item 2' }],
  nextId: 3,
};

export function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'LIST/ADD':
      return {
        items: [...state.items, { id: state.nextId, label: `Item ${state.nextId}` }],
        nextId: state.nextId + 1,
      };
    case 'LIST/REMOVE':
      return {
        ...state,
        items: state.items.filter((it) => it.id !== action.id),
      };
    default:
      return state;
  }
}
