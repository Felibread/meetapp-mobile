import React, { useState, useEffect, useMemo } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { parseISO, formatRelative, format, subDays, addDays } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Header,
  BackDate,
  TextDate,
  NextDate,
  MeetupsList,
  Meetup,
  Banner,
  MeetupText,
  Title,
  Info,
  MeetupDate,
  Location,
  Organizer,
  SubscriptionButton,
  NoMeetups,
  NoMeetupsText,
  LoadingContainer,
} from './styles';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  const [subscriptionLoading, setSubscriptionLoading] = useState(false);

  useEffect(() => {
    async function loadMeetups() {
      try {
        setLoading(true);
        setMeetups([]);

        const response = await api.get('schedules', {
          params: { date },
        });

        const formattedMeetups = response.data.map(meetup => {
          const formattedDate = formatRelative(parseISO(meetup.date), date);

          return { ...meetup, formattedDate };
        });

        setMeetups(formattedMeetups);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    }

    loadMeetups();
  }, [date]);

  async function refreshMeetups() {
    try {
      setLoading(true);
      setMeetups([]);

      const response = await api.get('schedules', {
        params: { date },
      });

      const formattedMeetups = response.data.map(meetup => {
        const formattedDate = formatRelative(parseISO(meetup.date), date);

        return { ...meetup, formattedDate };
      });

      setMeetups(formattedMeetups);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  const dateFormatted = useMemo(() => format(date, 'MMMM d'), [date]);

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  async function handleSubscribe(id) {
    try {
      setSubscriptionLoading(true);
      await api.post(`subscriptions/${id}`);
      Alert.alert('Success', 'Subscribed successfully!');
      setSubscriptionLoading(false);
    } catch (error) {
      setSubscriptionLoading(false);
      const message = error.response.data.error;
      Alert.alert('Error', message);
    }
  }

  return (
    <Background>
      <Container>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#fff" />
          </LoadingContainer>
        ) : (
          <>
            <Header>
              <BackDate onPress={() => handlePrevDay()}>
                <Icon name="chevron-left" size={64} color="#fff" />
              </BackDate>
              <TextDate>{dateFormatted}</TextDate>
              <NextDate onPress={() => handleNextDay()}>
                <Icon name="chevron-right" size={64} color="#fff" />
              </NextDate>
            </Header>
            {meetups.length > 0 ? (
              <MeetupsList
                data={meetups}
                onEndReachedThreshold={0.2}
                onRefresh={refreshMeetups}
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
                    {!meetup.past && (
                      <SubscriptionButton
                        loading={subscriptionLoading}
                        onPress={() => handleSubscribe(meetup.id)}
                      >
                        Subscribe
                      </SubscriptionButton>
                    )}
                  </Meetup>
                )}
              />
            ) : (
              <NoMeetups>
                <Icon name="emoticon-sad-outline" size={64} color="#fff" />
                <NoMeetupsText>No meetups for today</NoMeetupsText>
              </NoMeetups>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="view-dashboard" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
