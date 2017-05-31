import React, { Component, PropTypes } from 'react';
import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
import Slider from 'react-native-slider';
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
// This is the swipeable modal
var ModalBox   = require('react-native-modalbox');
import { Button } from 'react-native-elements';
import Actions from '../lib/ActionsMock';
import Ion from 'react-native-vector-icons/Ionicons'
import PlayerControls from '../components/PlayerControls';
import PlayerTags from '../components/PlayerTags';
import * as playerActions from '../reducers/player/playerActions'
import * as podcastHistoryActions from '../reducers/podcastHistory/podcastHistoryActions'
import * as tagActions from '../reducers/tag/tagActions'
import * as helpers from '../lib/helpers'
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
    const {media, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props;

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

    /*if (currentPlayer.progress + 1 > currentPlayer.duration && !this.state.finished) {
      actions.removePodcastHistory({mediaUrl: currentPlayer.mediaUrl});
      actions.getNextPodcastHistory({mediaUrl: currentPlayer.mediaUrl});
      this.setState({finished: true});
      console.log('player: ', currentPlayer);
    }*/
  }

  minimize() {
    this.props.actions.minimizePlayer();
  }
  _openExternalLink(req) {
    const isLocal = req.url.search('http://localhost') !== -1;
    console.log('_openExternalLink: ', req);

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
    const props = this.props;
    // let player = (this.props.player) ? this.props.player.toJS() : {};
    const {player} = this.state;

    let tags = [{}];

    if (this.props.tags) {
      let tagsHash = this.props.tags.toJS();
      tags = tagsHash[player.episodeKey] || [{}];
    }
    // console.log('PlayerModal (player): ', player);

    const currentTagIndex = _.findLastIndex(tags, (tag) => {
      return player.progress > tag.seconds;
    });

    const tagsOnSeekList = _.map(tags || [], (tag) => {
      return {
        position: (tag.seconds/props.duration) * (width - 10 - 10)
      }
    });

    return (

        <Modal
           animationType = {"slide"}
           transparent = {true}
           visible = {this.state.modalVisible}
           onRequestClose = {() => {console.log('Should this happen?  closing modal.......')}}
           >
          {/*<ModalBox position={"top"} style={{width: width, height: height}} isOpen={true} swipeArea={50} startOpen={true} animationDuration={10} backdrop={false}>*/}
          <View style = {styles.modal}>
            <PlayerControls mediaUrl={player.mediaUrl} title={player.title} duration={player.duration} episodeKey={player.episodeKey}
                            description={''} imageUrl={player.imageUrl} episodeTitle={player.episodeTitle} progress={player.progress}
                            playerStatus={player.playerStatus} tags={tagsOnSeekList} onClose={Actions.pop} />

            {((tags, width, height, styles, currentTagIndex, imageUrl) => {
              if (tags.length > 1) {
                return (
                  <View>
                    <PlayerTags tagList={tags} currentTagIndex={currentTagIndex}></PlayerTags>
                  </View>
                );
              } else {
                return (
                  <View style={{marginTop: 0}}>
                    {/*<ActivityIndicator animating = {true} size = "small" style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 80}} />*/}
                    <Image source={{ uri: imageUrl}} style={styles.photo} height={height/2} width={width}  />
                  </View>);
              }
            })(tags, width, height, styles, currentTagIndex, player.imageUrl)}
          </View>
      </Modal>

    );
  }
}

const styles = StyleSheet.create ({
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
    height: null,
    flex: 1,
    width: width,
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerModal)
