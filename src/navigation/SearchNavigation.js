'use strict';
import { StackNavigator } from 'react-navigation'

// Screens
import Search from '../containers/Search';

const routeConfiguration = {
  Search: { screen: Search },
};

const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRoute: 'Search'
};

export const SearchNavigation = StackNavigator(routeConfiguration,stackNavigatorConfiguration);