'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { SearchNavigation } from './NavigatorConfiguration';

// Redux
import { connect } from 'react-redux'

// Icon
import { StyleSheet, View, ListView, ScrollView, TouchableWithoutFeedback, Dimensions, Text, RefreshControl } from 'react-native'
import { Ionicons } from '@expo/vector-icons';



const mapStateToProps = (state) => {
  return {
    navigationState: state.tabOne
  }
}

class TabThreeNavigation extends React.Component {
  static navigationOptions = {
    title: 'Search',
    tabBarLabel: 'Search',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Ionicons name="ios-search" size={32} color="#888" />
        <Text style={{color: "#888888", fontSize: 10}}>Search</Text>
      </View>
    )
  };

  render(){
    const { navigationState, dispatch } = this.props;
    return (
      <SearchNavigation
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabThreeNavigation)