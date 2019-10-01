import produce from 'immer';

const INITIAL_STATE = {
  loading: false
};

export default function meetup(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@meetup/CREATE_MEETUP_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@meetup/CREATE_MEETUP_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@meetup/CREATE_MEETUP_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@meetup/UPDATE_MEETUP_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@meetup/UPDATE_MEETUP_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@meetup/UPDATE_MEETUP_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@meetup/CANCEL_MEETUP_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });
    case '@meetup/CANCEL_MEETUP_SUCCESS':
      return produce(state, draft => {
        draft.loading = false;
      });
    case '@meetup/CANCEL_MEETUP_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });
    default:
      return state;
  }
}
