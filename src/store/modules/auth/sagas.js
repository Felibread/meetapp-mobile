import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import NavigationService from '~/services/navigation';

import { signInSuccess, signUpSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
  } catch (err) {
    Alert.alert('Error', 'Fail to authenticate. Verify your data.');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, confirmPassword } = payload;

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Password confirmation different from password.');
      yield put(signFailure());
      return;
    }

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    // NavigationService.navigate('SignIn');
    Alert.alert('Success!', 'Log in');

    yield put(signUpSuccess());
  } catch (err) {
    Alert.alert(
      'Error!',
      'Failed to sign you up. Verify your data and try again.',
    );
    yield put(signFailure());
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
