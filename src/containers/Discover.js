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

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

import Show from '../containers/Show'

import PopularShows from './PopularShows';
import TaggedShows from './TaggedShows';
import CategoryList from './CategoryList';
/**
 * The components needed from React
 */
import React, {Component} from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexDirection: 'column',
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
    marginTop: 20,
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

  render () {
    console.log('Discover container');
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={styles.tab}
          initialPage={0}
          tabBarUnderlineStyle={{backgroundColor: '#444444', height: 2}}
          tabBarActiveTextColor="#444444"
          tabBarInactiveTextColor="#848484"
          scrollWithoutAnimation={true}
          renderTabBar={() => <ScrollableTabBar />}>

            <TaggedShows tabLabel='Tagged' />


            <PopularShows tabLabel='Popular' />

            <ScrollView tabLabel='Categories'>
              <CategoryList />
            </ScrollView>
        </ScrollableTabView>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default Discover
