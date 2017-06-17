import { StackNavigator, TabNavigator, addNavigationHelpers } from 'react-navigation';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
// Screens
import Queue from './containers/Queue';
import UserPodcasts from './containers/UserPodcasts';
import Search from './containers/Search';
import Discover from './containers/Discover';


import TaggedShows from './containers/TaggedShows';
import PopularShows from './containers/PopularShows';
import CategoryShows from './containers/CategoryShows';

import Show from './containers/Show';
import PlayerModal from './containers/PlayerModal';
import CategoryList from './containers/CategoryList';
import SubCategoryShows from './containers/SubCategoryShows';
import Profile from './containers/Profile';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';



export const QueueStack = StackNavigator({
  Queue: {
    screen: Queue,
    navigationOptions: {
      title: 'Queues',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  Show1: {
    screen: Show,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
      title: `Show1`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    }),
  },
}, {
  headerMode: 'none',
});

export const UserPodcastsStack = StackNavigator({
  UserPodcasts: {
    screen: UserPodcasts,
    navigationOptions: {
      title: 'Podcasts',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  Show2: {
    screen: Show,
    navigationOptions: ({ navigation }) => ({
      // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
      title: `Show2`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    }),
  },
},{
  headerMode: 'none',
});

export const SearchStack = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Search',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  }
},{
  headerMode: 'none',
});

export const DiscoverQueue = TabNavigator({
  TaggedShows: {
    screen: TaggedShows,
    navigationOptions: {
      title: 'Tagged Shows',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  PopularShows: {
    screen: PopularShows,
    navigationOptions: {
      title: 'Popular',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  CategoryShows: {
    screen: CategoryShows,
    navigationOptions: {
      title: 'Category',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  }
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  lazyLoad: true,
  animationEnabled: false,
  tabBarOptions: {
    activeTintColor: '#387ef5',
    indicatorStyle: {
      backgroundColor: '#387ef5',
      color: '#387ef5',
    },
    style: {
      backgroundColor: 'white',
    },
  },
});

export const DiscoverStack = StackNavigator({
  Discover: {
    screen: Discover,
    navigationOptions: {
      title: 'Discover',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  Show: {
    screen: Show,
    navigationOptions: ({ navigation }) => {
      console.log('Show3: navigation', navigation);
      return {
        // title: `${navigation.state.params.name.first.toUpperCase()} ${navigation.state.params.name.last.toUpperCase()}`,
        title: navigation.state.params.title,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#387ef5',
          elevation: null
        },
      }
    },
  },
  Player: {
    screen: PlayerModal,
    navigationOptions: {
      title: 'Player',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
  SubCategoryShows: {
    screen: SubCategoryShows,
    navigationOptions: ({ navigation }) => {
      // title: 'SubCategoryShows',
      return {
        title: navigation.state.params.genre,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#387ef5',
          elevation: null
        },
      }
    },
  },
  CategoryList: {
    screen: CategoryList,
    navigationOptions: {
      title: 'CategoryList',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  }
},{
  mode: 'modal',
});

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
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
    screen: DiscoverQueue,
    navigationOptions: {
      tabBarLabel: 'Discover',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-star" size={32} color={tintColor} />
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={35} color={tintColor} />
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
  SubCategoryShows: {
    screen: SubCategoryShows,
  },
  CategoryList: {
    screen: CategoryList,
  }
}, {
  mode: 'modal',
  // headerMode: 'none',
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






