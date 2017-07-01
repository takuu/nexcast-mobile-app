import React, {PropTypes, Component} from 'react';
import {
  View,
  ListView,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  RefreshControl
} from 'react-native';
const {height, width} = Dimensions.get('window');
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import striptags from 'striptags';
import _ from 'lodash';
import { List, ListItem, Button } from 'react-native-elements'

import EpisodeItem from '../components/EpisodeItem';

import * as showDetailActions from '../reducers/showDetail/showDetailActions'
import * as podcastActions from '../reducers/podcast/podcastActions';
import * as subscriptionActions from '../reducers/subscription/subscriptionActions';
import * as tagActions from '../reducers/tag/tagActions';
import Loader from '../components/Loader';

import { getParameterByName } from '../lib/helpers';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: 'white',
    //alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },
  listContainer: {
    flexDirection: 'column',
    flex: 1
  },
  textStyle: {
    marginLeft: 12,
    width: width - (width/10),
    height: 80,
  },
  title: {
    fontSize: 16,
    width: width - 80 - 24 - 80,
  },
  subContainer: {
    flex: 1,
    padding: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 80,
    paddingLeft: 5,
    paddingRight: 10
  },
  date: {
    fontSize: 11,
    lineHeight: 15,
    color: '#666666',
    width: width/2.5
  },
  description: {
    fontSize: 11,
    color: '#666666',
    flex: 1,
  },
  photo: {
    height: 80,
    width: 80,
  },
});

function mapStateToProps (state) {
  return {
    showDetail: state.showDetail.toJS() || {},
    podcastInfo: state.podcastInfo.toJS() || {},
    subscription: state.subscription.toJS(),
    tags: state.tags.toJS()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...showDetailActions, ...subscriptionActions, ...tagActions, ...podcastActions }, dispatch)
  }
}

class Show extends Component {
  constructor(props) {
    super(props);
    this.setSubscription = this.setSubscription.bind(this);
    this.removeSubscription = this.removeSubscription.bind(this);
  }
  componentWillMount() {
    var rssFeed = 'http://feeds.feedburner.com/BuildingNexcast/rss';
    const { rss } = this.props.navigation.state.params;
    this.props.actions.getEpisodes(rss);
    this.props.actions.hasTag(rss);
    this.props.actions.getAllSubscription();
    this.props.actions.getPodcast(rss);

  }

  setSubscription(show) {
    this.props.actions.setSubscription(show);
  }

  removeSubscription(show) {
    this.props.actions.removeSubscription(show);
  }

  render() {

    // var rssFeed = 'http://feeds.feedburner.com/BuildingNexcast/rss';
    const { rss } = this.props.navigation.state.params;

    let episodes = this.props.showDetail[rss] || [];
    console.log('Show: episodes', episodes);
    let thisShow = this.props.podcastInfo[rss];
    const tags = this.props.tags;
    const hasSubscription = this.props.subscription && this.props.subscription[rss];

    episodes = _.map(episodes, (episode) => {
      return {
        ...episode,
        hasTag: !!tags[episode.episode_key]
      }
    });

    const list = ds.cloneWithRows((episodes) || []);
    return (
      <View style={{flex: 1}}>

          {((episodes, list) => {
            if (episodes && episodes.length) {
              return (
                <View style={styles.listContainer}>
                  <List containerStyle={{marginTop: 0, height: '30%'}}>
                    <View style={styles.container}>
                      <Image source={{ uri: thisShow && thisShow.image_url}} style={styles.photo} />
                      <View style={styles.textStyle}>
                        <View style={{flex: 1, flexDirection: 'row', height: 30}}>
                          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {thisShow.title || ''}
                          </Text>
                          { Object.keys(tags).length ? <Image resizeMode='contain' style={{width: 16, height: 16, flex: 1}} source={require('../images/tag_icon.jpg')}/> : null }
                        </View>

                        <View style={styles.subContainer}>
                          <Text style={styles.date} numberOfLines={2} ellipsizeMode="tail">
                            {`${thisShow.artist_name || ''}\n` }
                          </Text>

                          {((hasSubscription, thisShow, removeSubscription, setSubcription) => {
                            if(hasSubscription) {
                              return (
                                <Button iconRight color={'white'} backgroundColor={'#33cd5f'}
                                        icon={{name: 'ios-arrow-down', type: 'ionicon', color: 'white'}}
                                        buttonStyle={{borderColor: '#33cd5f', borderWidth: 1, paddingTop: 3, paddingBottom: 3, paddingRight: 4, paddingLeft: 4}}
                                        textStyle={{fontSize: 10, lineHeight: 10}}
                                        onPress={() => removeSubscription(thisShow)}
                                        title='SUBSCRIBED' borderRadius={5} />
                              )
                            } else {
                              return (
                                <Button iconRight backgroundColor={'white'} color={'#33cd5f'}
                                        icon={{name: 'ios-arrow-down', type: 'ionicon', color: '#33cd5f'}}
                                        buttonStyle={{borderColor: '#33cd5f', borderWidth: 1, paddingTop: 3, paddingBottom: 3, paddingRight: 4, paddingLeft: 4}}
                                        textStyle={{fontSize: 10, lineHeight: 10}}
                                        onPress={() => setSubcription(thisShow)}
                                        title='SUBSCRIBE' borderRadius={5} />
                              )
                            }
                          })(hasSubscription, thisShow, this.removeSubscription, this.setSubscription)}


                        </View>

                      </View>
                    </View>
                    <View style={styles.container}>

                      <View style={styles.textStyle}>
                        <Text style={styles.title}>
                          Description
                        </Text>
                        <Text style={styles.description} numberOfLines={4} ellipsizeMode="tail" lineBreakMode="tail">
                          {thisShow.description}
                        </Text>
                      </View>
                    </View>
                  </List>
                  <ListView
                    dataSource={list}
                    enableEmptySections={true}
                    style={{paddingBottom: 0, backgroundColor: 'white'}}
                    renderRow={(item) => <EpisodeItem title={thisShow.title} description={item.description}
                    date={item.pubDate} duration={item.duration} episodeTitle={item.title} media={item.media_location}
                    imageUrl={thisShow.image_url} episodeKey={item.episode_key} hasTag={item.hasTag} navigation={this.props.navigation} />} />
                </View>
              )
            } else {
              return (
                <Loader />
              )
            }
          })(episodes, list)}


      </View>


    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show)
