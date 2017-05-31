import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SearchBar } from 'react-native-elements';
import * as searchActions from '../reducers/search/searchActions'

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  tabBar: {
    height: 51,
    borderTopColor: '#B2B2B2',
    borderTopWidth: 1,
    backgroundColor: '#F8F8F8'
  },
  inputText: {
    backgroundColor: '#FFFFFF',
    height: 28,
    width: width - (width/7),
    fontSize: 12,
  },
  searchBarContainer: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    height: 0
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 20
  }
});

function mapStateToProps (state) {
  return {
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    },

  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...searchActions  }, dispatch)
  }
}




function searchUpdated(text) {

}
class SearchNavBar extends Component {
  constructor(props) {
    super(props);
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  static propTypes = {
    onChangeText: PropTypes.func
  }

  static defaultProps = {
    onChangeText: function(){}
  }

  componentWillMount() {

  }

  searchUpdated(event) {
    console.log('searchUpdated: ', event.nativeEvent.text)
    this.props.actions.searchShows(event.nativeEvent.text);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar lightTheme containerStyle={styles.searchBarContainer} inputStyle={styles.inputText} onSubmitEditing={(e) => this.searchUpdated(e)}
                   placeholder='Search'/>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchNavBar)
