'use strict';
import { StackNavigator } from 'react-navigation'

// Screens
import Queue from '../containers/Queue';

const routeConfiguration = {
  Queue: { screen: Queue },
};

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'Queue'
};

export const ProfileNavigation = StackNavigator(routeConfiguration,stackNavigatorConfiguration);