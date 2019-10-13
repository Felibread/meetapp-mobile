import produce from 'immer';

const INITIAL_STATE = {
  loading: false,
};

export default function subscription(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@subscription/SUBSCRIBE_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@subscription/SUBSCRIBE_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@subscription/SUBSCRIBE_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@subscription/UNSUBSCRIBE_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@subscription/UNSUBSCRIBE_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@subscription/UNSUBSCRIBE_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
