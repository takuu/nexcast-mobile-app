'use strict';
import { StackNavigator } from 'react-navigation'

// Screens
import Discover from '../containers/Discover';
import Show from '../containers/Show';

const routeConfiguration = {
  Discover: { screen: Discover },
  Show: { screen: Show },
};

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'Discover'
};

export const DiscoverNavigation = StackNavigator(routeConfiguration,stackNavigatorConfiguration);