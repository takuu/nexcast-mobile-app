'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Scene from '../lib/Scene';


import * as searchActions from '../reducers/search/searchActions'


import SearchBox from '../components/SearchBox';

import React, {Component} from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'

import SearchNavBar from '../components/SearchNavBar'
import TabIcon from '../components/TabIcon';
import Ion from 'react-native-vector-icons/Ionicons'

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
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...searchActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 100
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
});

/**
 * ## App class
 */
class Search extends Component {

  render () {
    return (
      <View style={styles.container}>
        <View>
          <SearchBox></SearchBox>
        </View>
      </View>
    )
  }
}

class SearchHeaderIcon extends React.Component {
  render () {
    var color = '#FFFFFF';
    return (
      <View >
        <TouchableWithoutFeedback onPress={()=> (console.log('search was clicked'))}>
          <Ion style={{color: color}} name={this.props.iconName} size={30} />
        </TouchableWithoutFeedback>

      </View>
    )
  }
}

// function searchUpdated(text) {}

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  componentWillMount() {

  }

  searchUpdated(text) {
    this.props.actions.searchShows(text);
  }

  render () {
    return (
      <Scene key='Search' iconName={'ios-search-outline'} title="Search"
             renderRightButton={(e) => <SearchHeaderIcon iconName={'ios-search-outline'} />}
             renderTitle={() => <SearchNavBar onChangeText={this.searchUpdated}/>}
             icon={TabIcon} component={Search} />
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)
