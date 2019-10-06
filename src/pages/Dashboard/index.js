import React, { useState, useEffect } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
} from './styles';

function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('schedules?date=2019-10-10');

      const formattedMeetups = response.data.map(meetup => {
        const formattedDate = formatRelative(parseISO(meetup.date), date);

        return { ...meetup, formattedDate };
      });

      setMeetups(formattedMeetups);
    }

    loadMeetups();
  }, [date]);

  return (
    <Background>
      <Container>
        <Header>
          <BackDate>
            <Icon name="chevron-left" size={64} color="#fff" />
          </BackDate>
          <TextDate>10 de outubro</TextDate>
          <NextDate>
            <Icon name="chevron-right" size={64} color="#fff" />
          </NextDate>
        </Header>
        <MeetupsList
          data={meetups}
          keyExtractor={meetup => String(meetup.id)}
          renderItem={({ item: meetup }) => (
            <Meetup>
              <Banner
                source={{
                  uri: meetup.banner
                    ? meetup.banner.url
                    : 'https://api.adorable.io/avatars/59/abott@adorable.png',
                }}
              />
              <MeetupText>
                <Title>{meetup.name}</Title>
                <Info>
                  <MeetupDate>{meetup.formattedDate}</MeetupDate>
                  <Location>{meetup.location}</Location>
                  <Organizer>Organizer: {meetup.organizer.name}</Organizer>
                </Info>
              </MeetupText>
              <SubscriptionButton>Subscribe</SubscriptionButton>
            </Meetup>
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="dashboard" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
