import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// Screens
import Queue from './containers/Queue';
import UserPodcasts from './containers/UserPodcasts';
import Search from './containers/Search';
import Discover from './containers/Discover';
import Show from './containers/Show';
import PlayerModal from './containers/PlayerModal';
import Profile from './containers/Profile';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';



export const QueueStack = StackNavigator({
  Queue: {
    screen: Queue,
    navigationOptions: {
      title: 'Queue',
    },
  },
  Show1: {
    screen: Show,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
      title: `Show1`,
    }),
  },
});

export const UserPodcastsStack = StackNavigator({
  UserPodcasts: {
    screen: UserPodcasts,
    navigationOptions: {
      title: 'Podcasts',
    },
  },
  Show2: {
    screen: Show,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
      title: `Show2`,
    }),
  },
});

export const SearchStack = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
    },
  }
});

export const DiscoverStack = StackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      title: 'Discover',
    },
  },
  Show: {
    screen: Show,
    navigationOptions: ({ navigation }) => {
      console.log('Show3: navigation', navigation);
      return {
        // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
        title: navigation.state.params.title,
      }
    },
  },
  Player: {
    screen: PlayerModal,
    navigationOptions: {
      title: 'Player',
    },
  },
},{
  mode: 'modal',
  headerMode: 'none',
});

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
    },
  }
});


export const Tabs = TabNavigator({
  Queue: {
    screen: QueueStack,
    navigationOptions: {
      tabBarLabel: 'Queue',
      tabBarIcon: ({ tintColor }) => <Ionicons name="logo-buffer" size={32} color={tintColor} />,
    },
  },
  UserPodcasts: {
    screen: UserPodcastsStack,
    navigationOptions: {
      tabBarLabel: 'Podcasts',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-mic" size={32} color={tintColor} />,
    },
  },
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-search" size={32} color={tintColor} />,
    },
  },
  Discover: {
    screen: DiscoverStack,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-star" size={32} color={tintColor} />
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
    },
  },
});

export const PrimaryNav = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Show: {
    screen: Show,
  },
  Player: {
    screen: PlayerModal,
    navigationOptions: {
      title: 'Player',
    },
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

const Navigation = ({ dispatch, primaryNav }) => (
  <PrimaryNav
    navigation={addNavigationHelpers({
      dispatch,
      state: primaryNav
    })}
  />
)

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  primaryNav: PropTypes.object.isRequired
};

export const navReducer = (state, action) => {
  const newState = PrimaryNav.router.getStateForAction(action, state);
  return newState || state;
}

function mapStateToProps (state) {
  return {
    primaryNav: state.navReducer
  }
}

export default connect(mapStateToProps)(Navigation)






