import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { TabBarBottom } from 'react-navigation';
const {height, width} = Dimensions.get('window');

import { bindActionCreators } from 'redux';
import Ion from 'react-native-vector-icons/Ionicons';


import { connect } from 'react-redux';
import * as playerActions from '../reducers/player/playerActions';


const styles = StyleSheet.create({
  controls: {
    color: 'white',
    backgroundColor: '#0371d8',
    flex: 1,
    lineHeight: 32,
    textAlign: 'right',
  },
});


function mapStateToProps (state) {
  return {
    player: state.player.toJS(),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...playerActions  }, dispatch)
  }
}


class CustomTabBar extends Component {
  constructor() {
    super();
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }
  pause() {
    const {mediaUrl} = this.props.player;
    this.props.actions.playerPause(mediaUrl);
    console.log('CustomTabBar pause: ', this.props);
  }

  resume() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.player;

    this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }
  render() {
    const { player: {mediaUrl, title, duration, imageUrl, episodeTitle, playerStatus, episodeKey, progress}, navigation } = this.props;

    console.log('CustomTabBar render: ', this.props);
    //navigation.navigate('Player', {media, title, episodeTitle, duration, imageUrl, episodeKey, progress})
    return (
      <View>

        {(() => {
          if(playerStatus) {
            return (
              <TouchableWithoutFeedback onPress={() => navigation.navigate('Player', {media: mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress})}>
                <View style={{position: 'absolute', top: -32, height: 32, width: width, backgroundColor: '#0371d8', paddingTop: 0, paddingRight: 12, paddingLeft: 12, flex: 1, flexDirection: 'row'}}>
                  <Text style={{color: 'white', lineHeight: 32, width: (width - (width/6))}} numberOfLines={1} ellipsizeMode="tail">{title} :{episodeTitle}</Text>
                  {/*<Ion style={styles.controls} name={'ios-play'} size={24} />*/}

                  {((playerStatus, resume, pause) => {
                    if (playerStatus && playerStatus == 1) {
                      return (
                        <TouchableWithoutFeedback onPress={()=> (pause())}>
                          <Ion style={styles.controls} name={'ios-pause'} size={24} />
                        </TouchableWithoutFeedback>
                      );
                    } else {
                      return (
                        <TouchableWithoutFeedback onPress={()=> (resume())}>
                          <Ion style={styles.controls} name={'ios-play'} size={24} />
                        </TouchableWithoutFeedback>
                      )
                    }
                  })(playerStatus, this.resume, this.pause)}

                </View>
              </TouchableWithoutFeedback>

            )
          } else {
            return (
              <View style={{height: 50, width: width,flex: 1}}>
                {/*We need this as a placeholder for the bottom*/}
              </View>
            )
          }

        })()}

        {/*<View style={{position: 'absolute', top: -30, height: 30, width: width, backgroundColor: '#387ef5', zIndex: 100000000 }}>
          <Text style={{color: 'white'}}>Testt</Text>
        </View>*/}
        <TabBarBottom {...this.props} />
      </View>
    );
  }
}

CustomTabBar.propTypes = {};
CustomTabBar.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBar)

