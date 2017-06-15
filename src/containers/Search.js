'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

import Actions from '../lib/ActionsMock';
import SearchBox from '../components/SearchBox';
import Loader from '../components/Loader';
import ShowItem from '../components/ShowItem';


import React, {Component} from 'react'
import { StyleSheet, View, ListView, ScrollView, Dimensions, Text} from 'react-native'
const {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Search.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    },
    searchShows: state.searchShows.toJS()
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    height: height,
    marginTop: 0
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
  }
})

/**
 * ## App class
 */
class Search extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      hasSearched: false
    })
  }
  componentWillReceiveProps(nextProps) {
    const {isSearching, results} = nextProps.searchShows;
    if(isSearching) {
      this.setState({hasSearched: true})
    }
  }

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

  render () {

    const {isSearching, results} = this.props.searchShows;
    console.log('Search Container: ', this.props.searchShows);
    const list = ds.cloneWithRows(results || []);
    return (
    <ScrollView >
      <View style={styles.container}>
        {((searchShows, list) => {
          if(!this.state.hasSearched) {
            return (
              <View style={{marginTop: height - (height/1.5)}}>
                <SearchBox />
              </View>

            )
          } else {
            if (searchShows && searchShows.length) {
              return (
                <ListView style={{marginBottom: 60}}
                          enableEmptySections={true}
                          dataSource={list}
                          renderRow={(item) => <ShowItem imageUrl={item.artworkUrl100} title={item.trackName} description={item.artistName} rss={item.feedUrl} />}
                />
              );
            } else {
              return (
                <Loader />
              )
            }
          }

        })(results || [], list)}
      </View>
    </ScrollView>

    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Search)
