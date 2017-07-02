import React, {PropTypes, Component} from 'react';
import {
  ListView,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');

import ShowItem from '../components/ShowItem';
import Loader from '../components/Loader';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as taggedShowActions from '../reducers/taggedShow/taggedShowActions';
import { NativeRouter, Route, Link } from 'react-router-native';
import Show from '../containers/Show';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps (state) {
  return {
    taggedShows: state.taggedShows,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...taggedShowActions  }, dispatch)
  }
}

class TaggedShows extends Component {
  constructor(props) {
    super(props);
    this.state = {refreshing: false};
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.actions.getTaggedShows();
    setTimeout(() => {
      this._onRefresh();
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    this.setState({refreshing: false});
    return this.props.taggedShows !== nextProps.taggedShows;
  }

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.props.actions.getTaggedShows();
  }

  render() {
    const list = ds.cloneWithRows(this.props.taggedShows.toJS());
    // const list = ds.cloneWithRows(rawData);
    return (

      <View style={{backgroundColor: 'white'}}>
      <ScrollView
        tabLabel='Tagged'
        refreshControl={
                          <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            />
                        }
      >
        {((taggedShows, list) => {
          if (taggedShows && taggedShows.length) {
            return (
              <ListView style={{marginBottom: 60}}
                        enableEmptySections={true}
                        pageSize={15}
                        removeClippedSubviews={false}
                        dataSource={list}
                        renderRow={(item) => <ShowItem imageUrl={item.image_url} title={item.title} description={item.description} rss={item.feed_url} match={this.props.match} navigation={this.props.navigation} />}
              />
            );
          } else {
            return (
              <Loader></Loader>
            )
          }
        })(this.props.taggedShows.toJS(), list)}
      </ScrollView>
      </View>


    )
  }

};



export default connect(mapStateToProps, mapDispatchToProps)(TaggedShows)
