import React, {PropTypes} from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback, TouchableHighlight, Dimensions } from 'react-native';
import Actions from '../lib/ActionsMock';
const {height, width} = Dimensions.get('window');
import striptags from 'striptags';
import * as helpers from '../lib/helpers'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    //alignItems: 'center',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },
  textStyle: {
    marginLeft: 12,
    width: width - (width/10),
    height: 80,
  },
  title: {
    fontSize: 16,
    width: width - 80 - 24
  },
  date: {
    fontSize: 11,
    lineHeight: 20,
    color: '#666666'
  },
  description: {
    fontSize: 11,
    color: '#666666',
    width: width - 80 - 24
  },
  photo: {
    height: 80,
    width: 80,
  },
});

function _showPlayer (e) {

}

function _setModalVisible() {

}

const EpisodeItem = ({imageUrl, title, date, duration, description, episodeTitle, media, showImage, episodeKey, progress, hasTag, navigation}) => (
  <TouchableWithoutFeedback onPress={() => {
    navigation.navigate('Player', {media, title, episodeTitle, duration, imageUrl, episodeKey, progress}); }}>
    <View style={styles.container}>
      { imageUrl ? <Image source={{ uri: imageUrl}} style={styles.photo} /> : null }
      <View style={styles.textStyle}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {episodeTitle}
        </Text>
        <View style={{flex: 1, flexDirection: 'row', height: 16}}>
          <Text style={styles.date}>
            {`${helpers.prettyDate(date)}   ${helpers.prettyDuration(duration)}` }
          </Text>
          { hasTag ? <Image resizeMode='contain' style={{width: 16, height: 16, flex: 1}} source={require('../images/tag_icon.jpg')}/> : null }
        </View>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {striptags(description)}
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

EpisodeItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  episodeTitle: PropTypes.string,
  date: PropTypes.string,
  duration: PropTypes.number,
  description: PropTypes.string,
  media: PropTypes.string,
  progress: PropTypes.number
};

EpisodeItem.defaultProps = {
  imageUrl: '',
  title: '',
  episodeTitle: '',
  date: '',
  duration: '',
  description: '',
  media: '',
  progress: 0,
};

export default EpisodeItem;
