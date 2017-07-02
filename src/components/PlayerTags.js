import React, {PropTypes, Component} from 'react';

import {
  ListView,
  View,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Linking,
  WebView,
  TouchableWithoutFeedback,
} from 'react-native';
import Slider from 'react-native-slider';
import Ion from 'react-native-vector-icons/Ionicons'
import { bindActionCreators } from 'redux';
import Actions from '../lib/ActionsMock';
import { connect } from 'react-redux';
import * as tagActions from '../reducers/tag/tagActions';
const {height, width} = Dimensions.get('window');
import * as helpers from '../lib/helpers';
import _ from 'lodash';

function mapStateToProps (state) {
  return {
    tags: state.tags.toJS()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...tagActions  }, dispatch)
  }
}

class PlayerTags extends Component {
  constructor (props) {
    super(props);
    this._renderItem = this._renderItem.bind(this);
  }
  static propTypes = {
    tagList: PropTypes.array,
    currentTagIndex: PropTypes.number
  };
  static defaultProps = {
    currentTagIndex: 0,
    tagList: []
  };

  _renderItem(tag, index) {
    return (
      <View>
        <Image source={{ uri: tag.image_location}} style={styles.photo} height={height/2} width={width}  />
        <Text style={{width: width}}>{tag.content}</Text>
      </View>
    )
  }

  render() {
    const {tagList, currentTagIndex} = this.props;
    return (

      <View>
        <ScrollView horizontal={true} style={{width: width, backgroundColor: 'white'}} contentContainerStyle={{margin: 0, padding: 0}} decelerationRate={0} contentOffset={{x: currentTagIndex * width, y: 0}}
                    snapToInterval={width} snapToAlignment="center">
          {_.map(tagList, (tag, index) => {

            const button = (tag.button1_text) ? `
                          <button style="width:100%;height:50px;border:none;border-radius:5px;background-color:#02dd78;color:#fff;font-size:1.4em;" onclick="window.open('${tag.button1_link}', '_blank', 'location=yes')">
                          ${tag.button1_text}
                         </button>
                        ` : '';
            let video = null;

            let webContent = '';
            let image = null;

            if(tag.image_location) {
              webContent = `<img style='width:100%;padding:0px;margin:0px; ' src='${tag.image_location}' />`;
              //https://youtu.be/MoYjVTbLWyo
            } else if (tag.video_location) {
              video = (
                <View style={{width: width, height: 220, resizeMode: 'contain'}}>
                  <WebView
                    style={{flex:1}}
                    onError={(e)=> {console.log(e)}}
                    onLoad = {() => {console.log('Should this happen?  onLoad.......')}}
                    renderError = {() => {console.log('Should this happen?  renderError.......')}}
                    javaScriptEnabled={true}
                    source={{uri: tag.video_location || ''}}
                  />
                </View>

              )
            } else {
            }
            const formattedContent = `<style type="text/css">a{color: #01D56F;}</style><div style='width:100%;line-height:20px;margin-bottom:100px;'>${webContent}<br> <p style="color:#404040;font-size:18px;margin:1% 1% 5% 1%;white-space: normal;padding: 1%;">${tag.formattedContent}</p> ${button}</div>`;

            const webView =  (
                <WebView style={{ flex: 1, backgroundColor: 'white', resizeMode: 'contain'}}
                         contentInset={{top: -28, left: -8, bottom: 0, right: -8}}
                         onError={(e)=> {console.log(e)}}
                         onLoad = {() => {console.log('Should this happen?  onLoad.......')}}
                         renderError = {() => {console.log('Should this happen?  renderError.......')}}
                         renderLoading = {() => {console.log('Should this happen?  renderLoading.......')}}
                         scrollEnabled={true}
                         automaticallyAdjustContentInsets={false}
                         onNavigationStateChange={(event) => {
                                    }}

                         source={{html: formattedContent || ''}}
                         ></WebView>
              );

            return (
              <ScrollView key={index}
                  horizontal={false}
                  contentContainerStyle={{flex: 1, alignItems: 'stretch', width: width, justifyContent: 'flex-start'}}
                  style={{width: width, height: height/1.3}}>
                <View key={index} style={{flex: 1, flexDirection: 'column'}}>
                  {image}
                  {video}
                  {webView}
                </View>

              </ScrollView>
            )
          })}

        </ScrollView>
      </View>
    )
  }

};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 70
  },
  photo: {
    height: null,
    flex: 1,
    width: width,
  }
});



export default connect(mapStateToProps, mapDispatchToProps)(PlayerTags)
