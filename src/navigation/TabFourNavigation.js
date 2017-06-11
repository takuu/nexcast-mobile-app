'use strict'

// React
import React from 'react'

// Navigation
import { addNavigationHelpers } from 'react-navigation'
import { DiscoverNavigation } from './NavigatorConfiguration';

// Redux
import { connect } from 'react-redux'

// Icon
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const mapStateToProps = (state) => {
  return {
    navigationState: state.tabOne
  }
}

class TabFourNavigation extends React.Component {
  static navigationOptions = {
    title: 'Discover',
    tabBarLabel: 'Discoverr',
    tabBarIcon: ({ tintColor }) => (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Ionicons name="ios-star" size={32} color="#888" />
        <Text style={{color: "#888888", fontSize: 10}}>Discover</Text>
      </View>
    )
  }

  render(){
    const { navigationState, dispatch } = this.props;
    return (
      <DiscoverNavigation
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
export default connect(mapStateToProps)(TabFourNavigation)