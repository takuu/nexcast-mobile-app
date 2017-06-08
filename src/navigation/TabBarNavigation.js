'use strict'
import { TabNavigator } from 'react-navigation'
// Tab-Navigators
import Queue from '../containers/Queue';
import UserPodcasts from '../containers/UserPodcasts';
import Search from '../containers/Search';
import Discover from '../containers/Discover';


const routeConfiguration = {
  TabOneNavigation: { screen: Queue },
  TabTwoNavigation: { screen: UserPodcasts },
  TabThreeNavigation: { screen: Search },
  TabFourNavigation: { screen: Discover },
}

const tabBarConfiguration = {
  //...other configs
  tabBarOptions:{
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
// background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  }
}

console.log('TabBarNavigation');

export const TabBar = TabNavigator(routeConfiguration,tabBarConfiguration);

export const tabBarReducer = (state,action) => {
  if (action.type === 'JUMP_TO_TAB') {
    return { ...state, index:0 }
  } else {
    return TabBar.router.getStateForAction(action,state)
  }
}