import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
  margin-bottom: 5px;
`;

export const SignIn = styled.TouchableOpacity`
  margin-top: 30px;
`;

export const SignInText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
