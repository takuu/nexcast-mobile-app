import React, {PropTypes} from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - (height/3)

  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  }
});

const Loader = () => {
  return (
    <View style = {styles.container}>
      <ActivityIndicator animating = {true} style = {styles.activityIndicator} size = "small"/>
    </View>
  )
};

Loader.propTypes = {
};

Loader.defaultProps = {

};

export default Loader;
