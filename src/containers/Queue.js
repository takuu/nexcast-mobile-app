'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../reducers/auth/authActions';
import * as globalActions from '../reducers/global/globalActions';
import * as podcastHistoryActions from '../reducers/podcastHistory/podcastHistoryActions';
import { getEpisodes } from "../reducers/showDetail/showDetailActions";

import _ from 'lodash';
import Actions from '../lib/ActionsMock';
import Header from '../components/Header';
import EpisodeItem from '../components/EpisodeItem'
import React, {Component} from 'react'
import { StyleSheet, View, ListView, ScrollView, TouchableWithoutFeedback, Dimensions, Text, RefreshControl } from 'react-native'
const {height, width} = Dimensions.get('window');
const Button = require('apsl-react-native-button');
import Ion from 'react-native-vector-icons/Ionicons';
import { List, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
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
  },
  avatarStyle: {
    height: 50,
    width: 50
  }
});

var I18n = require('react-native-i18n');
import Translations from '../lib/Translations';
I18n.translations = Translations;

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const rawData = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    date: 'Sunday',
    duration: '28 min',
    description: 'Hello this is a description, Hello this is a description Hello this is a description'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    date: 'March 1, 2016',
    duration: '1 hr 28 min',
    description: 'Hello this is a description. Hello this is a description. '
  }
];


function mapStateToProps (state) {
  return {
    podcastHistory: state.podcastHistory,
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...podcastHistoryActions, getEpisodes }, dispatch)
  }
}
class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false};
  }

  componentWillMount() {
    this.props.actions.getAllPodcastHistory();
    this.props.actions.getEpisodesBySubscription();
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.setState({refreshing: false});
    const a = this.props.podcastHistory.toJS();
    const b = nextProps.podcastHistory.toJS();

    console.log('Queue shouldComponentUpdate: ', this.props, nextProps);

    return this.props.podcastHistory !== nextProps.podcastHistory;
  }

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.getAllPodcastHistory();
    this.props.actions.getEpisodesBySubscription();

  }

  render () {
    const orderedQueue = _.orderBy(this.props.podcastHistory.toJS(), ['lastPlayed', 'publishDate']);
    const list = ds.cloneWithRows(orderedQueue);
    // const list = ds.cloneWithRows(rawData);
    return (
      <ScrollView style={styles.container}
                  refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            />
                        }>
    {((orderedQueue, list) => {
      if(orderedQueue && orderedQueue.length) {
        console.log('Queue: ', list, orderedQueue);
        return (
          <View>
            <ListView
              dataSource={list}
              enableEmptySections={true}
              renderRow={(item) => <EpisodeItem title={item.title} description={item.description} progress={item.progress}
              date={item.publishDate} duration={item.duration} episodeTitle={item.episodeTitle} media={item.mediaUrl}
              imageUrl={item.imageUrl} episodeKey={item.episodeKey} navigation={this.props.navigation} />}
            />
          </View>
          );

      } else {
        return (
          <View>
            <TouchableWithoutFeedback onPress={() => Actions.Main({title: 'Discover'})}>
              <View style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#DDDDDD',}}>
                <View style={{ height: height/10,justifyContent: 'center',marginLeft: 8}}>
                  <Text style={{lineHeight: 41, fontSize: 18,}}>Add Episode to Queue</Text>
                </View>
                <Ion  style={{flex: 1, height: height/10, width: 10, lineHeight: height/10, textAlign: 'right', marginRight: 8}} name='ios-arrow-forward' size={30} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }

    })(orderedQueue, list)}
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Queue)
