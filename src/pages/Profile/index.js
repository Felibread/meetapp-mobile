import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity, Alert } from 'react-native';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
  Container,
  Avatar,
  Form,
  FormInput,
  SubmitButton,
  Divider,
  Logout,
} from './styles';
import api from '~/services/api';

export default function Profile() {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();

  const loading = useSelector(state => state.user.loading);
  const username = useSelector(state => state.user.profile.name);
  const useremail = useSelector(state => state.user.profile.email);
  const user_avatar = useSelector(state => state.user.profile.avatar.url);

  const [name, setName] = useState(username);
  const [email, setEmail] = useState(useremail);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [preview, setPreview] = useState('');
  const [image, setImage] = useState('');

  async function handleSubmit() {
    const data = new FormData();
    data.append('avatar', image);

    const response = await api.post('avatars', data);

    const { id } = response.data;

    try {
      dispatch(
        updateProfileRequest({
          name,
          email,
          avatar_id: id,
          password,
          newPassword,
          confirmNewPassword,
        }),
      );
    } catch (err) {
      Alert.alert('Error', 'Something went wrong');
    }
  }

  const options = {
    title: 'Select avatar',
  };

  async function handleSelectImage() {
    try {
      ImagePicker.showImagePicker(options, response => {
        if (response.error) {
          console.tron.log(response.error);
        } else if (response.didCancel) {
          console.tron.log('User canceled');
        } else {
          const thePreview = {
            uri: `data:image/jpeg;base64,${response.data}`,
          };

          let prefix;
          let ext;

          if (response.fileName) {
            [prefix, ext] = response.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const theImage = {
            uri: response.uri,
            type: response.type,
            name: `${prefix}.${ext}`,
          };

          setPreview(thePreview);
          setImage(theImage);
        }
      });
    } catch (err) {
      Alert.alert('Error', 'Please, try again.');
    }
  }

  return (
    <Background>
      <Container>
        <TouchableOpacity onPress={handleSelectImage}>
          <Avatar source={preview || { uri: user_avatar }} />
        </TouchableOpacity>

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
            email
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
          <Logout onPress={() => dispatch(signOut())}>Log out</Logout>
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
