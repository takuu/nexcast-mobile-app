import React, { Component, PropTypes } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  WebView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Actions from '../lib/ActionsMock';

import PlayerControls from '../components/PlayerControls';
import PlayerTags from '../components/PlayerTags';
import * as playerActions from '../reducers/player/playerActions'
import * as podcastHistoryActions from '../reducers/podcastHistory/podcastHistoryActions'
import * as tagActions from '../reducers/tag/tagActions'
import { bindActionCreators } from 'redux'

const {height, width} = Dimensions.get('window');
import { connect } from 'react-redux'
import _ from 'lodash';


function mapStateToProps (state) {
  return {
    player: state.player,
    tags: state.tags
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...playerActions, ...tagActions, ...podcastHistoryActions }, dispatch)
  }
}

class PlayerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: true, finished: false, player: {}};
    this.minimize = this.minimize.bind(this);
    this._openExternalLink = this._openExternalLink.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  componentWillMount() {
    const {media, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.navigation.state.params;

    this.props.actions.getTags(episodeKey);

    this.setState({ player: {
      mediaUrl: media,
      title: title,
      duration: duration,
      episodeKey: episodeKey,
      imageUrl: imageUrl,
      episodeTitle: episodeTitle,
      progress: progress,
      playerStatus: 1,
    }});

    this.props.actions.maximizePlayer();
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.player !== nextProps.player) || (this.props.tags !== nextProps.tags);
  }

  componentWillReceiveProps(nextProps) {
    const {player, actions} = nextProps;
    const nextPlayer = player.toJS();

    if (nextPlayer.mediaUrl && this.props.player !== player) {
      this.setState({player: {
        mediaUrl: nextPlayer.mediaUrl,
        title: nextPlayer.title,
        duration: nextPlayer.duration,
        episodeKey: nextPlayer.episodeKey,
        imageUrl: nextPlayer.imageUrl,
        episodeTitle: nextPlayer.episodeTitle,
        progress: nextPlayer.progress,
        playerStatus: nextPlayer.playerStatus,
      }});
    }

  }


  minimize() {
    this.props.navigation.goBack()
  }
  _openExternalLink(req) {
    const isLocal = req.url.search('http://localhost') !== -1;

    if (isLocal) {
      return true;
    } else {
      Linking.openURL(req.url);
      return false;
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render () {
    const props = this.props.navigation.state.params;
    const {player} = this.state;


    let tags = [{

      "cards_sid": "",
      "podcast_sid": "",
      "podcast_key": "",
      "podcast_rssurl": "http://hwcdn.libsyn.com/p/4/e/c/4ecc5b19d7cadb16/Part_9_-_Form_the_Team_-_Fend_off_the_Trolls.mp3?c_id=12701737&expiration=1507823015&hwt=191cf98caf240c6e57c4e1040782b9dc",
      "episode_key": "",
      "media_location": "",
      "time": "",
      "seconds": 12,
      "duration": 500,
      "content": "",
      "button1_text": "Baby Corgi",
      "button1_link": "",
      "image_location": "http://cdn3-www.dogtime.com/assets/uploads/gallery/pembroke-welsh-corgi-dog-breed-pictures/prance-8.jpg",
      "youtube_location": "",
      "status": "",
      "created_at": "",
      "updated_at": ""

    },
    {

      "cards_sid": "",
      "podcast_sid": "",
      "podcast_key": "",
      "podcast_rssurl": "http://hwcdn.libsyn.com/p/4/e/c/4ecc5b19d7cadb16/Part_9_-_Form_the_Team_-_Fend_off_the_Trolls.mp3?c_id=12701737&expiration=1507823015&hwt=191cf98caf240c6e57c4e1040782b9dc",
      "episode_key": "",
      "media_location": "",
      "time": "",
      "seconds": 200,
      "duration": 500,
      "content": "",
      "button1_text": "Corgi with a ball",
      "button1_link": "http://www.google.com",
      "image_location": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL5BtKrfpJ0DeaQ1cQeRvq3ZlyN6r0YvlgnZDOY4dJy90yF3BL",
      "youtube_location": "",
      "status": "",
      "created_at": "",
      "updated_at": ""

    }];
    console.log('PlayerModal: render', player, tags);

    if (this.props.tags) {
      let tagsHash = this.props.tags.toJS();
      // tags = tagsHash[player.episodeKey] || [{}];
    }

    const currentTagIndex = _.findLastIndex(tags, (tag) => {
      return player.progress > tag.seconds;
    });

    const tagsOnSeekList = _.map(tags || [], (tag) => {
      return {
        position: (tag.seconds/player.duration) * (width - 10 - 10)
      }
    });

    return (

        <Modal
           animationType = {"slide"}
           transparent = {true}
           visible = {true}
           onRequestClose = {() => {console.log('Should this happen?  closing modal.......')}}
           >

          <View style = {styles.modal}>

            <PlayerControls mediaUrl={player.mediaUrl} title={player.title} duration={player.duration} episodeKey={player.episodeKey}
                            description={''} imageUrl={player.imageUrl} episodeTitle={player.episodeTitle} progress={player.progress}
                            playerStatus={player.playerStatus} tags={tagsOnSeekList} onClose={this.minimize} />


            {((tags, width, height, styles, currentTagIndex, imageUrl) => {
              if (tags.length > 1) {
                return (
                  <View>
                    <PlayerTags tagList={tags} currentTagIndex={currentTagIndex}></PlayerTags>
                  </View>
                );
              } else {
                return (
                  <View style={{marginTop: 0, flex: 1}}>
                    <Image source={{ uri: imageUrl}} style={styles.photo} height={height/2} width={width}  />
                  </View>);
              }
            })(tags, width, height, styles, currentTagIndex, player.imageUrl)}
          </View>
      </Modal>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'blue'
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column'
  },
  photo: {
    // height: null,
    // flex: 1,
    width: width,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModal)
