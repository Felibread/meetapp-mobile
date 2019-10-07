import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { updateProfileRequest } from '~/store/modules/user/actions';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';

import {
  Container,
  Avatar,
  Form,
  FormInput,
  SubmitButton,
  Divider,
} from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const loading = useSelector(state => state.auth.loading);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  function handleSubmit() {
    dispatch(
      updateProfileRequest(
        name,
        email,
        password,
        newPassword,
        confirmNewPassword,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Avatar source={logo} />

        <Form>
          <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Your email"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Divider />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Your current password"
            ref={passwordRef}
            returnKeyType="next"
            onSubmitEditing={() => newPasswordRef.current.focus()}
            value={password}
            onChangeText={setPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Your new password"
            ref={newPasswordRef}
            returnKeyType="next"
            onSubmitEditing={() => confirmNewPasswordRef.current.focus()}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="New password confirmation"
            ref={confirmNewPasswordRef}
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />

          <SubmitButton loading={loading} onPress={() => handleSubmit()}>
            Update profile
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
  ),
};
