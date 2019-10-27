import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/screens/SignIn';
import SignUp from '~/screens/SignUp';

import Dashboard from '~/screens/Dashboard';
import Subscriptions from '~/screens/Subscriptions';
import History from '~/screens/History';
import Profile from '~/screens/Profile';

export default isSigned =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            History,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
              style: {
                borderTopColor: '#2B1A2F',
                backgroundColor: '#2B1A2F',
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      },
    ),
  );
