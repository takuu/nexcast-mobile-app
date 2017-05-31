import React, {PropTypes} from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import Actions from '../lib/ActionsMock';

var styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    width: 124,
    height: 124,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
  },
  thumb: {
    width: 124,
    height: 124
  },
  text: {
    flex: 1,
    marginTop: 5,
    fontWeight: 'bold'
  }
});
const ImageGridItem = ({imageUrl, route, rss, title}) => {
  const decodedImageUrl = decodeURI(imageUrl);
  const scene = route || 'UserShow';
  return (

    <View style={styles.row}>
      <TouchableWithoutFeedback  onPress={() => Actions.UserShow({rss: rss, title})} >
        <Image style={styles.thumb} source={{ uri: decodedImageUrl}} />
      </TouchableWithoutFeedback>

    </View>

  )
};

ImageGridItem.propTypes = {
  imageUrl: PropTypes.string,
  route: PropTypes.string,
};

ImageGridItem.defaultProps = {
  imageUrl: '',
  route: '',
};

export default ImageGridItem;
