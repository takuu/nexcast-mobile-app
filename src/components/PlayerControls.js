import React, {PropTypes, Component} from 'react';
let ReactNativeAudioStreaming = {
  pause: () => {},
  stop: () => {},
  start: () => {},
  resume: () => {},
};
import {
  ListView,
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Slider from 'react-native-slider';
import Ion from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux';
import Actions from '../lib/ActionsMock';
import { connect } from 'react-redux';
import * as playerActions from '../reducers/player/playerActions';
const {height, width} = Dimensions.get('window');
import * as helpers from '../lib/helpers'
import _ from 'lodash';

function mapStateToProps (state) {
  return {
    player: state.player.toJS()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...playerActions  }, dispatch)
  }
}

class PlayerControls extends Component {

  constructor (props) {
    super(props);
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.seekToTime = this.seekToTime.bind(this);
    this.stop = this.stop.bind(this);
  }
  static propTypes = {
    title:PropTypes.string,
    duration: PropTypes.number,
    episodeKey: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
    episodeTitle: PropTypes.string,
    mediaUrl: PropTypes.string,
    progress: PropTypes.number,
    playerStatus: PropTypes.number,
    tags: PropTypes.array,
    // onClose: PropTypes.function,
   };
  static defaultProps = {
    title: '',
    duration: 0,
    episodeKey: '',
    description: '',
    imageUrl: '',
    episodeTitle: '',
    mediaUrl: '',
    progress: 0,
    playerStatus: 1,
    tags: []
  };

  componentWillReceiveProps (nextProps) {
    if(this.props.mediaUrl != nextProps.mediaUrl) {
      const {duration, episodeKey, episodeTitle, imageUrl, mediaUrl,progress, title } = nextProps;
      this.props.actions.playerStart(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
    }
  }
  componentWillUpdate(nextProps, nextState ) {
    console.log('componentWillUpdate: ', this.props.player, nextProps.player);
    const isEqual = _.isEqual(this.props.player, nextProps.player);
    console.log('isEqual: ', isEqual);

    return !isEqual;

  }
  componentWillMount () {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props;
    this.start(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  start(mediaUrl='', title='', episodeTitle='', duration=0, imageUrl='', episodeKey='', progress=0) {
    // This is added to resume playing when opening from miniPlayer
    ReactNativeAudioStreaming.pause();
    ReactNativeAudioStreaming.resume();

    // ReactNativeAudioStreaming.stop();
    this.props.actions.playerStart(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);

  }
  pause() {
    const {mediaUrl} = this.props.player;
    console.log('PAUSED CLICKED');
    this.props.actions.playerPause(mediaUrl);
  }

  resume() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.player;
    console.log('RESUME CLICKED');
    this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  goBack() {
    const {mediaUrl, title, episodeTitle, progress} = this.props.player;
    this.props.actions.playerGoBack(mediaUrl, progress);
  }
  goForward() {
    const {mediaUrl, title, episodeTitle, progress} = this.props.player;
    this.props.actions.playerGoForward(mediaUrl, progress);

  }

  seekToTime(percent) {
    const {mediaUrl, title, episodeTitle, duration} = this.props.player;
    //seekToTime
    const sec = (percent/100) * duration;
    if(duration) this.props.actions.playerSeekTo(mediaUrl, sec);
    // if(this.props.duration) ReactNativeAudioStreaming.seekToTime(sec)
  }

  stop() {
    ReactNativeAudioStreaming.stop();
  }

  render() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress, playerStatus} = this.props.player;

    // const list = ds.cloneWithRows(rawData);
    const currentTagIndex = _.findLastIndex(this.props.tags, (tag) => {
      return progress > tag.seconds;
    });

    const sliderProgress = (progress) ? (progress/duration)*100 : 0;

    return (
      <View style = {styles.player}>


        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', height: 28, width: width}}>

          <TouchableWithoutFeedback onPress = {() =>(this.props.onClose())} style={{flex: 1}}>
            <Ion style={styles.hideModalControl} name={'ios-arrow-down'} size={30} />
          </TouchableWithoutFeedback>

          <View style={styles.titleBox}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{title}</Text>
            <Text style={styles.episodeTitle} numberOfLines={2} ellipsizeMode="tail">{episodeTitle}</Text>
          </View>
          <View style={{width: '5%', height:10}}></View>
        </View>


        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={()=> (console.log('1x'))}>
            <View style={{height: 30, flex: 1}}>
              <Text style={styles.customTextControls}>1x</Text>
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={()=> (this.goBack())}>
            <Image resizeMode='contain' style={styles.controls} source={require('../images/icon_skip_back.png')}/>
          </TouchableWithoutFeedback>

          {((playerStatus, resume, pause) => {
            if (playerStatus == 1) {
              console.log('PLAYING: SHOW PAUSE');
              return (
                <TouchableWithoutFeedback onPress={()=> (pause())}>
                  <Ion style={styles.customImageControls} name={'ios-pause'} size={30} />
                </TouchableWithoutFeedback>
              );
            } else {
              console.log('PAUSED: SHOW PLAY');
              return (
                <TouchableWithoutFeedback onPress={()=> (resume())}>
                  <Ion style={styles.customImageControls} name={'ios-play'} size={30} />
                </TouchableWithoutFeedback>
              )
            }
          })(playerStatus, this.resume, this.pause)}

          <TouchableWithoutFeedback onPress={()=> (this.goForward())}>
            <Image resizeMode='contain' style={styles.controls} source={require('../images/icon_skip_forward.png')} />
          </TouchableWithoutFeedback>
          <View style={styles.controls}></View>
        </View>


        <View style={styles.controlsContainer}>
          <View style={styles.dataBar}>
            <Text style={styles.elapsedTime}>{helpers.secondsToHMS(parseInt(progress || 0))}</Text>
            <Text style={styles.duration}>{helpers.secondsToHMS(duration || 0)}</Text>
          </View>

          <View style={styles.seekContainer}>


            <View style={styles.seekSubContainer}>

              {/*<View style={{backgroundColor: '#56a0e5', position: 'absolute', width: width-10, height: 18,top: 0, left: 0}}></View>*/}

              <Slider
                maximumValue={100}
                value={sliderProgress}
                step={1}
                minimumValue={0}
                trackStyle={customStyles5.track}
                thumbStyle={customStyles5.thumb}
                onSlidingComplete={(value) => this.seekToTime(value)}
                onSlidingStart={(value) => this.pause()}
                onValueChange={(value) => {console.log('onValueChange: ', value)}}
                zIndex={10}
                minimumTrackTintColor='#56a0e5'
              />
              {
                this.props.tags.map((tag, i) => (
                  <View key={i} zIndex={10} style={{backgroundColor: '#387ef5', position: 'absolute',width: 2,height: 35,top: 0,left: tag.position}}></View>
                ))
              }
            </View>
          </View>
        </View>
      </View>
    )
  }
};

var customStyles5 = StyleSheet.create({
  track: {
    height: 20,
    borderRadius: 1,
    backgroundColor: '#56a0e5',
    // backgroundColor: 'transparent',
    width: width -10,
  },
  thumb: {
    width: 5,
    height: 30,
    borderRadius: 1,
    zIndex: 10,
    backgroundColor: 'white',
  }
});


const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 70
  },
  slide: {
    color: 'white',
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
  },
  title: {
    color: 'white',
    fontSize: 18,
    lineHeight: 18,
    justifyContent: 'center',
    textAlign: 'center'

  },
  episodeTitle: {
    color: 'white',
    fontSize: 14,
    lineHeight: 14,
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleBox: {
    height: 28,
    width: width - (width/8),
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: '#387ef5',
    height: height/200,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1,
  },
  controls: {
    backgroundColor: '#387ef5',
    flex: 1,
    height: 30,
    width: (width/5) - 10,
  },
  customImageControls: {
    color: 'white',
    // backgroundColor: '#387ef5',
    backgroundColor: '#387ef5',
    flex: 1,
    height: 30,
    width: (width/5) - 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  hideModalControl: {
    color: 'white',
    // backgroundColor: 'red',
    backgroundColor: '#387ef5',
    lineHeight: 22,
    // flex: 1,
    height: 30,
    width: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'center'
  },
  customTextControls: {
    color: 'white',
    // backgroundColor: '#387ef5',
    backgroundColor: '#387ef5',
    marginTop: 0,
    flex: 1,
    height: 30,
    width: (width/5) - 10,
    alignItems: 'center',
    fontSize: 21,
    justifyContent: 'center',
    textAlign: 'center'
  },
  controlsContainer: {
    backgroundColor: '#387ef5',
    height: 20,
    marginLeft: 5,
    width: width-10,
    // width: width,
    // alignItems: 'center',
    // alignSelf: 'stretch',
    flex: 1,
  },
  seekContainer: {
    // backgroundColor: '#387ef5',
    // height: 20,
    // alignItems: 'center',
    // alignSelf: 'stretch',
    flex: 1,
    paddingTop:5,
    paddingBottom:15,
    // paddingRight:0,
    // paddingLeft:0,
  },
  seekSubContainer: {
    paddingRight: 10,
    width: width,

  },
  dataBar: {
    backgroundColor: '#387ef5',
    height: height/200,
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,

  },
  elapsedTime: {
    color: 'white',
    backgroundColor: '#387ef5',
    textAlign: 'left',
    flex: 1,
    height: 15,
  },
  duration: {
    color: 'white',
    backgroundColor: '#387ef5',
    textAlign: 'right',
    flex: 1,
    height: 15,
  },

  player: {
    paddingTop: height/20,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#387ef5',
    // alignSelf: 'stretch',
    height: height/3.4,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(PlayerControls)
