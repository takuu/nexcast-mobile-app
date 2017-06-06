import React, {PropTypes} from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';

import Actions from '../lib/ActionsMock';
const {height, width} = Dimensions.get('window');
import { NativeRouter, Route, Link } from 'react-router-native'
import Show from '../containers/Show';
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

const ShowItem = ({imageUrl, title, description, route, rss, match}) => {
  const decodedImageUrl = decodeURI(imageUrl);
  return (
    <View>
      <Link to={`/discover/showitem?rss=${rss}&title=${title}`}>
        <View style={styles.container}>

            { decodedImageUrl ? <Image source={{ uri: decodedImageUrl}} style={styles.photo} /> : null }
            <View style={styles.textStyle}>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {title}
              </Text>
              <Text style={styles.date}></Text>
              <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
                {description}
              </Text>
            </View>
        </View>
      </Link>
    </View>
  )
};

ShowItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  route: PropTypes.string,
  rss: PropTypes.string,
};

ShowItem.defaultProps = {
  imageUrl: '',
  title: '',
  description: '',
  route: 'DiscoverShow',
  rss: '',
};

export default ShowItem;


const foobar = ({imageUrl, title, description, route, rss, match}) =>(
  <View>
    <Link to={`${match.url}/showitem?rss=${rss}&title=${title}`}>
      <View style={styles.container}>

        { decodedImageUrl ? <Image source={{ uri: decodedImageUrl}} style={styles.photo}/> : null }
        <View style={styles.textStyle}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={styles.date}></Text>
          <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
            {description}
          </Text>
        </View>

      </View>
    </Link>
    <Route path={`${match.url}/showitem`} component={Show}></Route>
  </View>
)