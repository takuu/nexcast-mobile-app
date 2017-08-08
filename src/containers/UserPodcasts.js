'use strict';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Actions from '../lib/ActionsMock';

import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as subscriptionActions from '../reducers/subscription/subscriptionActions'
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header'
import ImageGridItem from '../components/ImageGridItem';

import React, {Component} from 'react'
import { StyleSheet, View, ListView, TouchableWithoutFeedback, Text, Dimensions, RefreshControl } from 'react-native'
const {height, width} = Dimensions.get('window');


const Button = require('apsl-react-native-button')
import Ion from 'react-native-vector-icons/Ionicons'
import _ from 'lodash';

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    borderBottomWidth: 1, borderBottomColor: '#DDDDDD'
  },
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 0,
    marginTop: 0,
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

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps (state) {
  return {
    subscription: state.subscription
  }
}

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
    const list = ds.cloneWithRows(foobar);
    return (
      <View style={styles.container}>
        {((foobar, list) => {
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
                        removeClippedSubviews={false}
                        dataSource={list}
                        renderRow={(item) => <ImageGridItem imageUrl={item.image_url} rss={item.feed_url} title={item.title} />} />
            )

          } else {
            return (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableWithoutFeedback onPress={() => Actions.Main({title: 'Discover'})}>
                    <View style={{flex: 1, flexDirection: 'row', height: height/10, width: '100%', borderBottomWidth: 1, borderBottomColor: '#DDDDDD'}}>
                      <View style={{ justifyContent: 'center',marginLeft: 8}}>
                        <Text style={{lineHeight: 41, fontSize: 18,}}>Subscribe to Podcasts</Text>
                      </View>
                      <Ion style={{flex: 1, height: height/11, width: 10, lineHeight: height/11, textAlign: 'right', marginRight: 8}} name='ios-arrow-forward' size={30} />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserPodcasts);
