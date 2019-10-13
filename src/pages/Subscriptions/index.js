import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import MaterialComunnityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { unsubscribeMeetupRequest } from '~/store/modules/subscription/actions';

import Background from '~/components/Background';
import {
  Container,
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
  MeetupsLink,
  MeetupsLinkText,
} from './styles';

export default function Subscriptions({ navigation }) {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const unsubscriptionLoading = useSelector(
    state => state.subscription.loading,
  );

  useEffect(() => {
    async function loadSubscriptions() {
      try {
        setLoading(true);
        const response = await api.get('subscriptions');

        const formattedMeetups = response.data.map(subscription => {
          const formattedDate = formatRelative(
            parseISO(subscription.meetup.date),
            date,
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
  }, [date]);

  function handleUnsubscription(id) {
    dispatch(unsubscribeMeetupRequest(id));
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
            {subscriptions.length > 0 ? (
              <MeetupsList
                data={subscriptions}
                keyExtractor={meetup => String(meetup.id)}
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
                        loading={unsubscriptionLoading}
                        onPress={() => handleUnsubscription(meetup.id)}
                      >
                        Unsubscribe
                      </SubscriptionButton>
                    )}
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
                <NoMeetupsText>No subscriptions</NoMeetupsText>
                <MeetupsLink onPress={() => navigation.navigate('Dashboard')}>
                  <MeetupsLinkText>Check meetups</MeetupsLinkText>
                </MeetupsLink>
              </NoMeetups>
            )}
          </>
        )}
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: ({ tintColor }) => (
    <MaterialIcon name="event" size={20} color={tintColor} />
  ),
};

Subscriptions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
