import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import MaterialComunnityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '~/services/api';

import Background from '~/components/Background';
import {
  Container,
  Header,
  ScreenTitle,
  MeetupsList,
  Meetup,
  Banner,
  MeetupText,
  Title,
  Info,
  MeetupDate,
  Location,
  Organizer,
  NoMeetups,
  NoMeetupsText,
  LoadingContainer,
  MeetupsLink,
  MeetupsLinkText,
} from './styles';

export default function History({ navigation }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        setLoading(true);
        const response = await api.get('subscriptions');

        const onlyFutureMeetups = response.data.filter(subscription => {
          return subscription.meetup.past === true;
        });

        const formattedMeetups = onlyFutureMeetups.map(subscription => {
          const formattedDate = formatRelative(
            parseISO(subscription.meetup.date),
            new Date(),
          );

          return { ...subscription.meetup, formattedDate };
        });

        setSubscriptions(formattedMeetups);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadSubscriptions();
  }, []);

  async function refreshSubscriptions() {
    try {
      setLoading(true);
      setSubscriptions([]);
      const response = await api.get('subscriptions');

      const formattedMeetups = response.data.map(subscription => {
        const formattedDate = formatRelative(
          parseISO(subscription.meetup.date),
          new Date(),
        );

        return { ...subscription.meetup, formattedDate };
      });

      setSubscriptions(formattedMeetups);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <Header>
          <ScreenTitle>You went to</ScreenTitle>
        </Header>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingContainer>
        ) : (
          <>
            {subscriptions.length > 0 ? (
              <MeetupsList
                data={subscriptions}
                keyExtractor={meetup => String(meetup.id)}
                onRefresh={refreshSubscriptions}
                refreshing={loading}
                renderItem={({ item: meetup }) => (
                  <Meetup>
                    <Banner
                      source={{
                        uri: meetup.banner
                          ? meetup.banner.url
                          : 'https://rocketseat.com.br/static/og.png',
                      }}
                    />
                    <MeetupText>
                      <Title>{meetup.name}</Title>
                      <Info>
                        <MeetupDate>{meetup.formattedDate}</MeetupDate>
                        <Location>{meetup.location}</Location>
                        <Organizer>
                          Organizer: {meetup.organizer.name}
                        </Organizer>
                      </Info>
                    </MeetupText>
                  </Meetup>
                )}
              />
            ) : (
              <NoMeetups>
                <MaterialComunnityIcon
                  name="emoticon-sad-outline"
                  size={64}
                  color="#fff"
                />
                <NoMeetupsText>No meetups here yet</NoMeetupsText>
                <MeetupsLink onPress={() => navigation.navigate('Dashboard')}>
                  <MeetupsLinkText>Check meetups</MeetupsLinkText>
                </MeetupsLink>
                <TouchableOpacity onPress={() => refreshSubscriptions()}>
                  <MaterialComunnityIcon
                    name="refresh"
                    size={32}
                    color="#fff"
                  />
                </TouchableOpacity>
              </NoMeetups>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

History.navigationOptions = {
  tabBarLabel: 'History',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcon name="history" size={20} color={tintColor} />
  ),
};

History.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
