import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import {
  subscribeMeetupSucces,
  subscribeMeetupFailure,
  unsubscribeMeetupSucces,
  unsubscribeMeetupFailure,
} from './actions';

export function* subscribe({ payload }) {
  try {
    const { id } = payload;

    yield call(api.post, `subscriptions/${id}`);

    Alert.alert('Success', 'Subscribed successfully!');
    yield put(subscribeMeetupSucces());
  } catch (err) {
    Alert.alert('Error', 'Something went wrong D:');
    yield put(subscribeMeetupFailure());
  }
}

export function* unsubscribe({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscriptions/${id}`);

    Alert.alert('Success', 'Unsubscribed successfully!');
    yield put(unsubscribeMeetupSucces());
  } catch (err) {
    Alert.alert('Error', 'Something went wrong D:');
    yield put(unsubscribeMeetupFailure());
  }
}

export default all([
  takeLatest('@subscription/SUBSCRIBE_REQUEST', subscribe),
  takeLatest('@subscription/UNSUBSCRIBE_REQUEST', unsubscribe),
]);
