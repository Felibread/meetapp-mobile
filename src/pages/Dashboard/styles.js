import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Header = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BackDate = styled.TouchableOpacity``;

export const TextDate = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const NextDate = styled.TouchableOpacity``;

export const MeetupsList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
  padding: 0 20px;
`;

export const Meetup = styled.View`
  background: #fff;
  border-radius: 6px;
  flex: 1;

  margin: 10px 0;
`;

export const Banner = styled.Image`
  background: #eee;
  width: 100%;
  height: 175px;
`;

export const MeetupText = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const Info = styled.View`
  margin: 15px;
`;

export const MeetupDate = styled.Text`
  color: #999;
  margin-bottom: 5px;
`;

export const Location = styled.Text`
  color: #999;
  margin-bottom: 5px;
`;

export const Organizer = styled.Text`
  color: #999;
  margin-bottom: 5px;
`;

export const SubscriptionButton = styled(Button)`
  margin: 15px;
`;

export const NoMeetups = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const NoMeetupsText = styled.Text`
  color: #fff;
  font-size: 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
