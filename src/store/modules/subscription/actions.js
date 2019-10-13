export function subscribeMeetupRequest(id) {
  return {
    type: '@subscription/SUBSCRIBE_REQUEST',
    payload: { id },
  };
}

export function subscribeMeetupSucces() {
  return {
    type: '@subscription/SUBSCRIBE_SUCCESS',
  };
}

export function subscribeMeetupFailure() {
  return {
    type: '@subscription/SUBSCRIBE_FAILURE',
  };
}

export function unsubscribeMeetupRequest(id) {
  return {
    type: '@subscription/UNSUBSCRIBE_REQUEST',
    payload: { id },
  };
}

export function unsubscribeMeetupSucces() {
  return {
    type: '@subscription/UNSUBSCRIBE_SUCCESS',
  };
}

export function unsubscribeMeetupFailure() {
  return {
    type: '@subscription/UNSUBSCRIBE_FAILURE',
  };
}
