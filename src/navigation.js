import { StackNavigator, TabNavigator, addNavigationHelpers, TabBarBottom } from 'react-navigation';
import {
  View, Text, Dimensions, StyleSheet
} from 'react-native';
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
import CustomTabBar from './components/CustomTabBar';
const {height, width} = Dimensions.get('window');
import { SearchBar } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#387ef5",
    borderWidth: 0,
  },
  inputText: {
    backgroundColor: "#56a0e5",
    borderWidth: 0,
    fontSize: 11
  }
});


export const QueueStack = StackNavigator({
  Queue: {
    screen: Queue,
    navigationOptions: {
      title: 'Queue',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#387ef5',
        elevation: null
      },
    },
  },
}, {
  // headerMode: 'none',
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
  // headerMode: 'none',
  swipeEnabled: true,
  lazyLoad: true,
  animationEnabled: false,
});

/*
For Android
// import { SearchBar } from 'react-native-elements';
<SearchBar round containerStyle={{ backgroundColor: "#387ef5", borderWidth: 0 }}
                 inputStyle={{backgroundColor: "#56a0e5", borderWidth: 0, fontSize: 11}} onChangeText={()=> {}}
                 placeholder='Search' placeholderTextColor="#ffffff" />
 */


Search.navigationOptions = {
  header:(// Your custom header
    <View style={{ height:64, backgroundColor: '#387ef5', marginTop:0 }}>
      <SearchBar round containerStyle={{ backgroundColor: "#387ef5", borderWidth: 0 }}
                 inputStyle={{backgroundColor: "#56a0e5", borderWidth: 0, fontSize: 11}} onChangeText={()=> {}}
                 placeholder='Search' placeholderTextColor="#ffffff" />
    </View>
  )}
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
  // headerMode: 'none',
});

export const DiscoverTabs = TabNavigator({
  TaggedShows: {
    screen: TaggedShows,
    // screen: TaggedShowsStack,
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
  // tabBarComponent: CustomTabBar,
/*  tabBarComponent: (props) => {
    console.log('tabBarComponent: ', props);
    return (
      <View >
        <View style={{position: 'absolute', top: 0, height: 10, width: width, backgroundColor: 'green', zIndex: 100000000 }}>
          <Text>Testt</Text>
        </View>
        <TabBarBottom {...props} />
     </View>

    );
  },*/
  tabBarOptions: {
    activeTintColor: '#387ef5',
    activeBorderWidth: 25,
    activeBorderColor: '#EEEEEE',
    activeBackgroundColor: '#56a0e5',
    
    indicatorStyle: {
      backgroundColor: '#56a0e5',
      color: '#387ef5',
    },
    style: {
      backgroundColor: '#56a0e5',

    },
    tabStyle: {
      flex: 1,
      height: '20%',
      alignItems: 'center',
      backgroundColor: 'green',
      justifyContent: 'center',
    },
    labelStyle: {
      fontSize: 14,
      // alignItems: 'center',
      backgroundColor: 'white',
      lineHeight: 40,
      paddingBottom: '2%',
      paddingTop: '10%',
      // justifyContent: 'center',
      marginBottom: '1%',
    }
  },
});

export const DiscoverStack = StackNavigator({
  DiscoverTabs: {
    screen: DiscoverTabs,
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
},{
  // headerMode: 'none',
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
}, {
  // headerMode: 'none',
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
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-star" size={32} color={tintColor} />,

    },

  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={35} color={tintColor} />
    },
  },
}, {
  tabBarComponent: CustomTabBar,
});



export const PrimaryNav = StackNavigator({
  Tabs: {
    screen: Tabs,
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
  // mode: 'modal',
  headerMode: 'none',
});

const Navigation = ({ dispatch, primaryNav }) => (
  <PrimaryNav
    navigation={addNavigationHelpers({
      dispatch,
      state: primaryNav
    })}
  />
);

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  primaryNav: PropTypes.object.isRequired
};

export const navReducer = (state, action) => {
  const newState = PrimaryNav.router.getStateForAction(action, state);
  return newState || state;
};

function mapStateToProps (state) {
  return {
    primaryNav: state.navReducer
  }
}

export default connect(mapStateToProps)(Navigation)






