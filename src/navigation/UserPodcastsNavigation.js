'use strict';
import { StackNavigator } from 'react-navigation'

// Screens
import UserPodcasts from '../containers/UserPodcasts';

const routeConfiguration = {
  UserPodcasts: { screen: UserPodcasts },
};

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'UserPodcasts'
};

export const UserPodcastsNavigation = StackNavigator(routeConfiguration,stackNavigatorConfiguration);