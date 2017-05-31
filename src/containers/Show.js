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
import striptags from 'striptags';
import _ from 'lodash';
import { List, ListItem, Button } from 'react-native-elements'

import EpisodeItem from '../components/EpisodeItem';

import * as showDetailActions from '../reducers/showDetail/showDetailActions'
import * as subscriptionActions from '../reducers/subscription/subscriptionActions';
import * as tagActions from '../reducers/tag/tagActions';
import Loader from '../components/Loader';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const rawData = {
  "status": 1,
  "result": {
    "id": "3c8865ee08ca6686c37fd677b7451698",
    "title": "Twenty Thousand Hertz",
    "imageurl": "http:\/\/static.libsyn.com\/p\/assets\/7\/e\/c\/b\/7ecb8d382f02537c\/20kHz-s1-ArtworkiTunes.jpg",
    "published_date": "Tue, 29 Nov 2016 16:57:28 +0000",
    "language": "en",
    "author": "Defacto Sound",
    "keywords": "",
    "owner_email": "dallas@20k.org",
    "owner_name": "Dallas Taylor",
    "long_desc": "The stories behind the world's most recognizable and interesting sounds. ",
    "episodes": [{
      "title": "8-bit Sounds",
      "pubDate": "Tue, 29 Nov 2016 16:57:28 +0000",
      "link": "http:\/\/20khz.libsyn.com\/8-bit-sounds",
      "description": "<p class=\"p1\">Primitive, yet iconic, 8-bit audio defined a generation through video game sounds and music. Discover the history and innovation behind those audio marvels that still fascinate today.<\/p>",
      "duration": "12:31",
      "keywords": "",
      "subtitle": "Primitive, yet iconic, 8-bit audio defined a generation through video game sounds and music. Discover the history and innovation behind those audio marvels that still fascinate today.",
      "media_location": "http:\/\/traffic.libsyn.com\/20khz\/20K_-_8-Bit_11-29.mp3?dest-id=440475",
      "episode_key": "87667914e0bca5e355395aa97d41ffe9"
    }, {
      "title": "The NBC Chimes",
      "pubDate": "Tue, 15 Nov 2016 21:23:38 +0000",
      "link": "http:\/\/20khz.libsyn.com\/the-nbc-chimes",
      "description": "<p><span style=\"font-weight: 400;\">NBC\u2019s three little chimes didn\u2019t just define a television network, they defined a generation. Where did they come from and what is the surprising impact they have had on current and future media? Featuring<\/span> <span style= \"font-weight: 400;\">the last person to play the NBC chimes on the NBC radio network, broadcaster Rick Greenhut, and radio historian, John Schneider.<br \/> <br \/><\/span> Find out more at <a href=\"http:\/\/www.20k.org\" target= \"_blank\">20k.org<\/a>.<br \/> <br \/> 20K<br \/> 20,000<\/p>",
      "duration": "13:09",
      "keywords": "",
      "subtitle": "NBC\u2019s three little chimes didn\u2019t just define a television network, they defined a generation. Where did they come from and what is the surprising impact they have had on current and future media? Featuring the last person to play the NBC chimes on...",
      "media_location": "http:\/\/traffic.libsyn.com\/20khz\/20K_-_NBC_11-23_Update_2.mp3?dest-id=440475",
      "episode_key": "d789a0787ad5951c653d9ca5006bbb5b"
    }, {
      "title": "The Voice of Siri",
      "pubDate": "Tue, 01 Nov 2016 02:18:52 +0000",
      "link": "http:\/\/20khz.libsyn.com\/the-voice-of-siri",
      "description": "<p>When Siri launched in 2011, she permanently changed the way people interacted with their technology. What was it like to be the voice behind that voice? And how did they make that voice come to life? Featuring the original voice of Siri, voice actor Susan Bennett, and Director of Speech to Text Technology for Nuance, Dr. Andrew Breen.<\/p>",
      "duration": "12:30",
      "keywords": "",
      "subtitle": "When Siri launched in 2011, she permanently changed the way people interacted with their technology. What was it like to be the voice behind that voice? And how did they make that voice come to life? Featuring the original voice of Siri, voice actor...",
      "media_location": "http:\/\/traffic.libsyn.com\/20khz\/20K_-_EP1_Siri.mp3?dest-id=440475",
      "episode_key": "df68b4d739383d809ec461586f463e04"
    }, {
      "title": "Trailer",
      "pubDate": "Mon, 31 Oct 2016 19:49:50 +0000",
      "link": "http:\/\/20khz.libsyn.com\/trailer",
      "description": "<p>Twenty Thousand Hertz: Stories about the world's most recognizable and interesting sounds. Presented by <a href= \"http:\/\/www.defactosound.com\">Defacto Sound<\/a>.<\/p>",
      "duration": "01:38",
      "keywords": "",
      "subtitle": "Twenty Thousand Hertz: Stories about the world's most recognizable and interesting sounds. Presented by Defacto Sound.",
      "media_location": "http:\/\/traffic.libsyn.com\/20khz\/20K_-_Series_Promo_v3.mp3?dest-id=440475",
      "episode_key": "fe6161fc8ef4fb34d95830deff1a2059"
    }]
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
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
    subscription: state.subscription.toJS(),
    tags: state.tags.toJS()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...showDetailActions, ...subscriptionActions, ...tagActions  }, dispatch)
  }
}

class Show extends Component {
  constructor(props) {
    super(props);
    this.setSubscription = this.setSubscription.bind(this);
    this.removeSubscription = this.removeSubscription.bind(this);
  }
  componentWillMount() {
    this.props.actions.getEpisodes(this.props.rss);
    this.props.actions.hasTag(this.props.rss);
    this.props.actions.getAllSubscription();

  }

  setSubscription(show) {
    this.props.actions.setSubscription(show);
  }

  removeSubscription(show) {
    this.props.actions.removeSubscription(show);
  }

  render() {
    const thisShow = this.props.showDetail[this.props.rss] || {};
    const tags = this.props.tags;
    const hasSubscription = this.props.subscription && this.props.subscription[this.props.rss];
    // console.log('episodes.. Check for sting duration: ', thisShow.episodes);

    thisShow.episodes = _.map(thisShow.episodes, (episode) => {
      return {
        ...episode,
        hasTag: !!tags[episode.episode_key]
      }
    });
    const list = ds.cloneWithRows((thisShow && thisShow.episodes) || []);
    return (
      <View style={{flex: 1}}>

          {((episodes, list) => {
            if (episodes && episodes.length) {
              return (
                <View style={styles.listContainer}>
                  <List containerStyle={{marginTop: 60}}>
                    <View style={styles.container}>
                      <Image source={{ uri: thisShow && thisShow.imageurl}} style={styles.photo} />
                      <View style={styles.textStyle}>
                        <View style={{flex: 1, flexDirection: 'row', height: 30}}>
                          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                            {thisShow.title || ''}
                          </Text>
                          { Object.keys(tags).length ? <Image resizeMode='contain' style={{width: 16, height: 16, flex: 1}} source={require('../images/tag_icon.jpg')}/> : null }
                        </View>

                        <View style={styles.subContainer}>
                          <Text style={styles.date} numberOfLines={2} ellipsizeMode="tail">
                            {`${thisShow.author || ''}\n` }
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
                          {thisShow.long_desc}
                        </Text>
                      </View>
                    </View>
                  </List>
                  <ListView
                    dataSource={list}
                    enableEmptySections={true}
                    style={{paddingBottom: 0}}
                    renderRow={(item) => <EpisodeItem title={thisShow.title} description={item.description}
                    date={item.pubDate} duration={item.duration} episodeTitle={item.title} media={item.media_location}
                    imageUrl={thisShow.imageurl} episodeKey={item.episode_key} hasTag={item.hasTag} />} />
                </View>
              )
            } else {
              return (
                <Loader />
              )
            }
          })(thisShow && thisShow.episodes, list)}


      </View>


    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Show)
