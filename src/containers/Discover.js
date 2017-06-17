'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as discoverActions from '../reducers/discover/discoverActions'
import * as taggedShowActions from '../reducers/taggedShow/taggedShowActions'

/**
 * Router
 */
import Actions from '../lib/ActionsMock';

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import { NativeRouter, Route, Link } from 'react-router-native'

import Header from '../components/Header'


import PopularShows from './PopularShows';
import TaggedShows from './TaggedShows';
// import CategoryList from './CategoryList';
import CategoryShows from './CategoryShows';
/**
 * The components needed from React
 */
import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  },
  tab: {
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  text: {
    fontSize: 12
  }

})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={ (props) => (
    <route.component {...props} routes={route.routes} />
  )} />
);



/**
 * ## App class
 */
class Discover extends Component {

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  componentWillMount(){
    // this.props.actions.getPopular();
    // this.props.actions.getTaggedShows();
  }

  static navigationOptions = {
    tabBarLabel: 'Discover',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Ionicons name="ios-star" size={32} color="#888" />
        <Text style={{color: "#888888", fontSize: 10}}>Discover</Text>
      </View>
    )
  };

  render () {
    console.log('Discover: ', this.props);

    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.tab}
          initialPage={1}
          prerenderingSiblingsNumber={1}
          tabBarUnderlineStyle={{backgroundColor: '#444444', height: 2}}
          tabBarActiveTextColor="#444444"
          tabBarInactiveTextColor="#848484"
          scrollWithoutAnimation={true}
          renderTabBar={() => <ScrollableTabBar />}>

            <TaggedShows tabLabel='Tagged' match={this.props.match} navigation={this.props.navigation} />


            <PopularShows tabLabel='Popular' match={this.props.match} navigation={this.props.navigation} />


            <CategoryShows tabLabel="Categories" match={this.props.match} navigation={this.props.navigation}/>

{/*            <ScrollView tabLabel='Categories' navigation={this.props.navigation}>
              <CategoryList navigation={this.props.navigation} />
            </ScrollView>*/}
        </ScrollableTabView>

      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default Discover
