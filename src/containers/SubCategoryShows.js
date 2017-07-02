import React, {PropTypes, Component} from 'react';
import {
  ListView,
  View,
  ScrollView
} from 'react-native';
import _ from 'lodash';
import Loader from '../components/Loader';
import ShowItem from '../components/ShowItem';
import * as discoverActions from '../reducers/discover/discoverActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

function mapStateToProps (state) {
  return {
    podcasts: state.podcasts.toJS(),
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...discoverActions  }, dispatch)
  }
}


class SubCategoryShows extends Component {
  componentWillMount(){
    const { genreId } = this.props.navigation.state.params;
    this.props.actions.getCategory(genreId);
    // this.props.actions.getTaggedShows();
  }
  render() {
    const { genreId } = this.props.navigation.state.params;

    const myList = _.filter(this.props.podcasts, (item) => {
      return (item.genre_id == genreId);
    });
    const list = ds.cloneWithRows(myList);
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
      {((myList, list) => {
        if (myList && myList.length) {
          return (
            <ListView style={{paddingTop: 0,}}
                      dataSource={list}
                      enableEmptySections={true}
                      renderRow={(item, i) => <ShowItem key={i} imageUrl={item.image_url} title={item.title} description={item.description} rss={item.feed_url} match={this.props.match} navigation={this.props.navigation}  />}
            />
          );
        } else {
          return (
            <View style={{marginTop: 80}}>
              <Loader></Loader>
            </View>

          )
        }
      })(myList, list)}
      </ScrollView>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubCategoryShows)
