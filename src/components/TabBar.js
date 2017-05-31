import React, { Component, PropTypes } from 'react';
import {
  Image,
  View, Text, StyleSheet, TouchableWithoutFeedback, Dimensions,
} from 'react-native';
import Tabs from 'react-native-tabs';

import Actions from '../lib/ActionsMock';
import TabbedView from '../lib/TabbedView';
import Ion from 'react-native-vector-icons/Ionicons'

import { bindActionCreators } from 'redux'

import { connect } from 'react-redux'

import * as playerActions from '../reducers/player/playerActions'
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create ({
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

class TabBar extends Component {

  static propTypes = {
    navigationState: PropTypes.object,
    tabIcon: PropTypes.any,
    onNavigate: PropTypes.func,
    unmountScenes: PropTypes.bool,
    pressOpacity: PropTypes.number,
    hideOnChildTabs: PropTypes.bool,
  };


  constructor(props, context) {
    super(props, context);
    this.renderScene = this.renderScene.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
  }

  onSelect(el) {
    if (!Actions[el.props.name]) {
      throw new Error(
        `No action is defined for name=${el.props.name} ` +
        `actions: ${JSON.stringify(Object.keys(Actions))}`);
    }
    if (typeof el.props.onPress === 'function') {
      el.props.onPress();
    } else {
      Actions[el.props.name]();
    }
  }

  renderScene(navigationState) {
    return (
      <DefaultRenderer
        key={navigationState.key}
        onNavigate={this.props.onNavigate}
        navigationState={navigationState}
      />
    );
  }

  pause() {
    const {mediaUrl} = this.props.player;
    this.props.actions.playerPause(mediaUrl);
  }

  resume() {
    const {mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress} = this.props.player;

    this.props.actions.playerResume(mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, progress);
  }

  render() {
    const state = this.props.navigationState;
    const selected = state.children[state.index];

    const hideTabBar = this.props.unmountScenes ||
      Actions.deepestExplicitValueForKey(state, 'hideTabBar') ||
      (this.props.hideOnChildTabs && Actions.deepestExplicitValueForKey(selected, 'tabs'));

    const {title, mediaUrl, episodeTitle, duration, imageUrl, description, playerStatus, episodeKey} = this.props.player || {};


    const contents = (
      <View>
        {(() => {
          if(playerStatus) {
            //{media, title, episodeTitle, duration, imageUrl, description}
            //Actions.ShowModal({media, title, episodeTitle, duration, imageUrl, episodeKey, progress}
            return (
              <TouchableWithoutFeedback onPress={() => Actions.ShowModal({media:mediaUrl, title, episodeTitle, duration, imageUrl, episodeKey, description})}>
                <View style={{height: 93, backgroundColor: '#0371d8', paddingTop: 4, paddingRight: 12, paddingLeft: 12, flex: 1, flexDirection: 'row'}}>
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

        <Tabs
          style={state.tabBarStyle}
          selectedIconStyle={state.tabBarSelectedItemStyle}
          iconStyle={state.tabBarIconContainerStyle}
          onSelect={this.onSelect} {...state}
          selected={selected.sceneKey}
          pressOpacity={this.props.pressOpacity}
        >
          {state.children.filter(el => el.icon || this.props.tabIcon).map((el, i) => {
            const Icon = el.icon || this.props.tabIcon;
            return <Icon {...this.props} {...el} />;
            {/*return <Text key={i}>Hi</Text>;*/}
          })}
        </Tabs>
      </View>

    );
    return (
      <View
        style={{ flex: 1 }}
      >
        <TabbedView
          navigationState={this.props.navigationState}
          style={{ flex: 1 }}
          renderScene={this.renderScene}
        />
        {!hideTabBar && state.children.filter(el => el.icon).length > 0 &&
        (state.tabBarBackgroundImage ? (
          <Image source={state.tabBarBackgroundImage}>
            {contents}
          </Image>
        ) : contents)
        }
      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TabBar)
// export default TabBar;
