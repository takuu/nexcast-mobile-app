import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native'
import PropTypes from 'prop-types';

import { NativeRouter, Route, Link } from 'react-router-native'
import { Provider } from 'react-redux'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import configureStore from './lib/configureStore'

import Search from './containers/Search';
import Discover from './containers/Discover';
import Profile from './containers/Profile';
import Queue from './containers/Queue';
import UserPodcasts from './containers/UserPodcasts';
import Show from './containers/Show';

import { addNavigationHelpers, StackNavigator } from 'react-navigation';

const Home = () => (
  <Text style={styles.header}>
    Home
  </Text>
)

const About = () => {
  console.log('About: jes testing');
  return (
    <Text style={styles.header}>
      About
    </Text>
  )
};


export const AppNavigator = StackNavigator({
  Home: { screen: Home },
  About: { screen: About },
  Queue: { screen: Queue },
  UserPodcasts: { screen: UserPodcasts },
  Search: { screen: Search },
  Discover: { screen: Discover },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);