import React, {PropTypes, Component}  from 'react';
import {
  ScrollView,TouchableWithoutFeedback
} from 'react-native';
import * as discoverActions from '../reducers/discover/discoverActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'react-native-elements'

import Actions from '../lib/ActionsMock';
// {"status":1,"result":[{"genre_id":0,"genre_name":"All"},{"genre_id":1301,"genre_name":"Art"},{"genre_id":1321,"genre_name":"Business"},{"genre_id":1303,"genre_name":"Comedy"},{"genre_id":1304,"genre_name":"Education"},{"genre_id":1323,"genre_name":"Games & Hobby"},{"genre_id":1326,"genre_name":"Government & Organization"},{"genre_id":1307,"genre_name":"Health"},{"genre_id":1305,"genre_name":"Kids & Family"},{"genre_id":1310,"genre_name":"Music"},{"genre_id":1311,"genre_name":"News & Politics"},{"genre_id":1314,"genre_name":"Religion & Sprituality"},{"genre_id":1315,"genre_name":"Science & Medicine"},{"genre_id":1324,"genre_name":"Society & Culture"},{"genre_id":1316,"genre_name":"Sports & Recreation"},{"genre_id":1318,"genre_name":"Technology"},{"genre_id":1309,"genre_name":"TV & Film"}]}
const rawData = [{
  "genre_id": 0,
  "genre_name": "All"
}, {
  "genre_id": 1301,
  "genre_name": "Art"
}, {
  "genre_id": 1321,
  "genre_name": "Business"
}, {
  "genre_id": 1303,
  "genre_name": "Comedy"
}, {
  "genre_id": 1304,
  "genre_name": "Education"
}, {
  "genre_id": 1323,
  "genre_name": "Games & Hobby"
}, {
  "genre_id": 1326,
  "genre_name": "Government & Organization"
}, {
  "genre_id": 1307,
  "genre_name": "Health"
}, {
  "genre_id": 1305,
  "genre_name": "Kids & Family"
}, {
  "genre_id": 1310,
  "genre_name": "Music"
}, {
  "genre_id": 1311,
  "genre_name": "News & Politics"
}, {
  "genre_id": 1314,
  "genre_name": "Religion & Sprituality"
}, {
  "genre_id": 1315,
  "genre_name": "Science & Medicine"
}, {
  "genre_id": 1324,
  "genre_name": "Society & Culture"
}, {
  "genre_id": 1316,
  "genre_name": "Sports & Recreation"
}, {
  "genre_id": 1318,
  "genre_name": "Technology"
}, {
  "genre_id": 1309,
  "genre_name": "TV & Film"
}];


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

class CategoryList extends Component {
  render() {
    console.log('CategoryList container', this.props);
    return (
      <ScrollView style={{flex: 1}}>
        <List containerStyle={{marginBottom: 40, marginTop: 0, flex: 1}}>
          {
            rawData.map((item) => (
              <TouchableWithoutFeedback key={item.genre_id} onPress={() => {
                this.props.navigation.navigate('SubCategoryShows', {genre: item.genre_name, genreId: item.genre_id});
                // Actions.SubCategoryShows({genre: item.genre_name, genreId: item.genre_id})
              }}>
                <ListItem
                  onPress={() => {
                    this.props.navigation.navigate('SubCategoryShows', {genre: item.genre_name, genreId: item.genre_id});
                    // Actions.SubCategoryShows({title: item.genre_name, genre: item.genre_name})
                  }}
                  title={item.genre_name}
                  style={{padding: '2%', borderBottomWidth: 1, borderColor: '#eeeeee'}}
                />
              </TouchableWithoutFeedback>
            ))
          }
        </List>
      </ScrollView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)

/*
export default React.createClass({
  render() {
    console.log('CategoryList container');
    return (
      <ScrollView style={{flex: 1}}>
        <List containerStyle={{marginBottom: 40, marginTop: 0, flex: 1}}>
          {
            rawData.map((item) => (
            <TouchableWithoutFeedback key={item.genre_id} onPress={() => {
              this.props.navigation.navigate('SubCategoryShows', {genre: item.genre_name, genreId: item.genre_id});
              // Actions.SubCategoryShows({genre: item.genre_name, genreId: item.genre_id})
            }}>
              <ListItem
                onPress={() => {
                  this.props.navigation.navigate('SubCategoryShows', {media, title, episodeTitle, duration, imageUrl, episodeKey, progress});
                  // Actions.SubCategoryShows({title: item.genre_name, genre: item.genre_name})
                }}
                title={item.genre_name}
              />
            </TouchableWithoutFeedback>
            ))
          }
        </List>
      </ScrollView>
    )
  },
});
*/

