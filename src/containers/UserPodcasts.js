'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '../lib/ActionsMock';
/**
 * The actions we need
 */

import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as subscriptionActions from '../reducers/subscription/subscriptionActions'
import { Ionicons } from '@expo/vector-icons';
/**
 * Router
 */

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'
import ImageGridItem from '../components/ImageGridItem';

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import { StyleSheet, View, ListView, TouchableWithoutFeedback, Text, Dimensions, RefreshControl } from 'react-native'
const {height, width} = Dimensions.get('window');

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')
import Ion from 'react-native-vector-icons/Ionicons'
import _ from 'lodash';

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which UserPodcasts.js will depend on.
 *
 */

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 60,
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
});
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const rawData = [{
  "rss": "http://feeds.feedburner.com/TheAdamCarollaPodcast",
  "image": "http://ace.noxsolutions.com/images/podcast/AdamCarolla_3_4_1400.png",
  "date": "2016-12-03T19:40:57.584Z"
}, {
  "rss": "http://feeds.feedburner.com/BuildingNexcast/rss",
  "image": "http://static.libsyn.com/p/assets/c/2/a/d/c2ade2d446381379/buildIt.jpg",
  "date": "2016-12-03T19:41:01.991Z"
}, {
  "rss": "http://feeds.serialpodcast.org/serialpodcast",
  "image": "https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png",
  "date": "2016-12-03T19:41:07.829Z"
}, {
  "rss": "http://feeds.podtrac.com/5EZzzED0uv_k",
  "image": "https://serialpodcast.org/sites/all/modules/custom/serial/img/serial-itunes-logo.png",
  "date": "2016-12-03T20:19:00.728Z"
}];


function mapStateToProps (state) {
  return {
    subscription: state.subscription
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...subscriptionActions }, dispatch)
  }
}

class UserPodcasts extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false};
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState);
    this.setState({refreshing: false});
    return true;
    return this.props.subscription !== nextProps.subscription;
  }

  componentWillMount() {
    this.props.actions.getAllSubscription();
  }

  static navigationOptions = {
    title: 'Podcasts',
    tabBarLabel: 'Podcasts',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    tabBarIcon: ({ tintColor }) => (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Ionicons name="ios-mic" size={32} color="#888" />
        <Text style={{color: "#888888", fontSize: 10}}>Podcasts</Text>
      </View>
    )
  };

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.getAllSubscription();
  }

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  render () {
    const foobar = _.map(this.props.subscription.toJS());
    // const list = ds.cloneWithRows(rawData);
    const list = ds.cloneWithRows(foobar);
    console.log('User Podcasts', foobar);
    return (
      <View style={styles.container}>
        {(() => {
          if(foobar && foobar.length) {
            return (
              <ListView contentContainerStyle={styles.list}
                        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                        enableEmptySections={true}
                        dataSource={list}
                        renderRow={(item) => <ImageGridItem imageUrl={item.imageurl} rss={item.rss} title={item.title} />} />
            )

          } else {
            return (
              <View style={{marginTop: 0}}>
                  <TouchableWithoutFeedback onPress={() => Actions.Main({title: 'Discover'})}>
                    <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#DDDDDD'}}>
                      <View style={{ height: height/10,justifyContent: 'center',marginLeft: 8}}>
                        <Text style={{lineHeight: 41, fontSize: 18, }}>Subscribe to Podcasts</Text>
                      </View>
                      <Ion  style={{flex: 1, height: height/10, width: 10, lineHeight: height/10, textAlign: 'right', marginRight: 8}} name='ios-arrow-forward' size={30} />
                    </View>
                  </TouchableWithoutFeedback>
              </View>
            )
          }
        })(foobar, list)}

      </View>

    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(UserPodcasts)
