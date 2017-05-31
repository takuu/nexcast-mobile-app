import React, {PropTypes} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  textStyle: {
    marginLeft: 12
  },
  title: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 80,
    width: 80,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    borderColor: '#DDDDDD',
    borderWidth: 1,
    fontSize: 11
  }
});
function searchUpdated(text) {

}

const SearchBox = ({imageUrl, title, description}) => {
  return (
    <View>
      <SearchBar lightTheme containerStyle={styles.container} inputStyle={styles.inputText} onChangeText={searchUpdated}
           placeholder='Add a podcast feed URL here to add it to our discovery'/>
    </View>
  )
};

SearchBox.propTypes = {
};

SearchBox.defaultProps = {
};

export default SearchBox;
