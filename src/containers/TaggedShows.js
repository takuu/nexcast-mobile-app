import React, {PropTypes, Component} from 'react';
import {
  ListView,
  View,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';

import ShowItem from '../components/ShowItem';
import Loader from '../components/Loader';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as taggedShowActions from '../reducers/taggedShow/taggedShowActions';
import { NativeRouter, Route, Link } from 'react-router-native';
import Show from '../containers/Show';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const rawData = [
  {
    "ranking_sid": 7173606,
    "name": "TED Radio Hour",
    "rss_feed_id": "378f6bcda9d961996e03fed34fb868b8",
    "rss_feed": "http:\/\/www.npr.org\/rss\/podcast.php?id=510298",
    "summary": "The TED Radio Hour is a journey through fascinating ideas: astonishing inventions, fresh approaches to old problems, new ways to think and create. Based on Talks given by riveting speakers on the world-renowned TED stage, each show is centered on a common theme \u2013 such as the source of happiness, crowd-sourcing innovation, power shifts, or inexplicable connections. The TED Radio Hour is hosted by Guy Raz, and is a co-production of NPR & TED. Follow the show @TEDRadioHour.",
    "artworkUrl100": "http:\/\/is5.mzstatic.com\/image\/thumb\/Music71\/v4\/21\/3a\/3e\/213a3e55-3264-653c-7fda-b8ef4dc39bbf\/source\/100x100bb.jpg",
    "ranking": 3,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": 22
  }, {
    "ranking_sid": 7173607,
    "name": "Undone",
    "rss_feed_id": "53542cdd5d42e30cf6907a082aa4dc95",
    "rss_feed": "http:\/\/feeds.gimletmedia.com\/undoneshow",
    "summary": "When big news happens, the world tunes in and then moves on. But often the stories we thought were over haven\u2019t really ended. They were the beginning of something else. Undone is a new show from Gimlet Media that digs up the surprising things that happened when we weren\u2019t looking. Hosted by Pat Walters.",
    "artworkUrl100": "http:\/\/is5.mzstatic.com\/image\/thumb\/Music71\/v4\/47\/61\/48\/47614833-4ea0-e513-4c7b-5adb6b4a5d60\/source\/100x100bb.jpg",
    "ranking": 4,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": null
  }, {
    "ranking_sid": 7173604,
    "name": "Crimetown",
    "rss_feed_id": "baa29456ebfd0da02b87381bcfda8db4",
    "rss_feed": "http:\/\/feeds.gimletmedia.com\/crimetownshow",
    "summary": "Welcome to Crimetown, a new series from Gimlet Media and the creators of HBO's The Jinx. Every season, we'll investigate the culture of crime in a different American city. First up: Providence, Rhode Island, where organized crime and corruption infected every aspect of public life. This is a story of alliances and betrayals, of heists and stings, of crooked cops and honest mobsters\u2014a story where it's hard to tell the good guys from the bad guys. Hosted by Marc Smerling and Zac Stuart-Pontier.",
    "artworkUrl100": "http:\/\/is2.mzstatic.com\/image\/thumb\/Music71\/v4\/f1\/31\/3a\/f1313a60-f63f-3be9-31aa-5fbd5832a196\/source\/100x100bb.jpg",
    "ranking": 1,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": null
  }, {
    "ranking_sid": 7173605,
    "name": "This American Life",
    "rss_feed_id": "b477238935faf27b5e62e7e6f8659097",
    "rss_feed": "http:\/\/feed.thisamericanlife.org\/talpodcast",
    "summary": "This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 1.5 million people download the weekly podcast. It is hosted by Ira Glass, produced in collaboration with Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.",
    "artworkUrl100": "http:\/\/is1.mzstatic.com\/image\/thumb\/Music71\/v4\/03\/3c\/f1\/033cf19b-a70e-108f-2d77-82c5b8c8cde0\/source\/100x100bb.jpg",
    "ranking": 2,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": 27
  },
  {
    "ranking_sid": 7173606,
    "name": "TED Radio Hour",
    "rss_feed_id": "378f6bcda9d961996e03fed34fb868b8",
    "rss_feed": "http:\/\/www.npr.org\/rss\/podcast.php?id=510298",
    "summary": "The TED Radio Hour is a journey through fascinating ideas: astonishing inventions, fresh approaches to old problems, new ways to think and create. Based on Talks given by riveting speakers on the world-renowned TED stage, each show is centered on a common theme \u2013 such as the source of happiness, crowd-sourcing innovation, power shifts, or inexplicable connections. The TED Radio Hour is hosted by Guy Raz, and is a co-production of NPR & TED. Follow the show @TEDRadioHour.",
    "artworkUrl100": "http:\/\/is5.mzstatic.com\/image\/thumb\/Music71\/v4\/21\/3a\/3e\/213a3e55-3264-653c-7fda-b8ef4dc39bbf\/source\/100x100bb.jpg",
    "ranking": 3,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": 22
  }, {
    "ranking_sid": 7173607,
    "name": "Undone",
    "rss_feed_id": "53542cdd5d42e30cf6907a082aa4dc95",
    "rss_feed": "http:\/\/feeds.gimletmedia.com\/undoneshow",
    "summary": "When big news happens, the world tunes in and then moves on. But often the stories we thought were over haven\u2019t really ended. They were the beginning of something else. Undone is a new show from Gimlet Media that digs up the surprising things that happened when we weren\u2019t looking. Hosted by Pat Walters.",
    "artworkUrl100": "http:\/\/is5.mzstatic.com\/image\/thumb\/Music71\/v4\/47\/61\/48\/47614833-4ea0-e513-4c7b-5adb6b4a5d60\/source\/100x100bb.jpg",
    "ranking": 4,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": null
  }, {
    "ranking_sid": 7173604,
    "name": "Crimetown",
    "rss_feed_id": "baa29456ebfd0da02b87381bcfda8db4",
    "rss_feed": "http:\/\/feeds.gimletmedia.com\/crimetownshow",
    "summary": "Welcome to Crimetown, a new series from Gimlet Media and the creators of HBO's The Jinx. Every season, we'll investigate the culture of crime in a different American city. First up: Providence, Rhode Island, where organized crime and corruption infected every aspect of public life. This is a story of alliances and betrayals, of heists and stings, of crooked cops and honest mobsters\u2014a story where it's hard to tell the good guys from the bad guys. Hosted by Marc Smerling and Zac Stuart-Pontier.",
    "artworkUrl100": "http:\/\/is2.mzstatic.com\/image\/thumb\/Music71\/v4\/f1\/31\/3a\/f1313a60-f63f-3be9-31aa-5fbd5832a196\/source\/100x100bb.jpg",
    "ranking": 1,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": null
  }, {
    "ranking_sid": 7173605,
    "name": "This American Life",
    "rss_feed_id": "b477238935faf27b5e62e7e6f8659097",
    "rss_feed": "http:\/\/feed.thisamericanlife.org\/talpodcast",
    "summary": "This American Life is a weekly public radio show, heard by 2.2 million people on more than 500 stations. Another 1.5 million people download the weekly podcast. It is hosted by Ira Glass, produced in collaboration with Chicago Public Media, delivered to stations by PRX The Public Radio Exchange, and has won all of the major broadcasting awards.",
    "artworkUrl100": "http:\/\/is1.mzstatic.com\/image\/thumb\/Music71\/v4\/03\/3c\/f1\/033cf19b-a70e-108f-2d77-82c5b8c8cde0\/source\/100x100bb.jpg",
    "ranking": 2,
    "genre_id": 0,
    "genre_name": "All",
    "created_at": "2016-11-28 00:02:27",
    "updated_at": "2016-11-28 00:02:27",
    "tag": 27
  }
];

const list = ds.cloneWithRows(rawData);


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
    // this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount() {
    this.props.actions.getTaggedShows();
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
    console.log('TaggedShows (Container): ', (this.props.taggedShows.toJS())[0]);
    console.log('props', this.props.match);
    const list = ds.cloneWithRows(this.props.taggedShows.toJS());
    // const list = ds.cloneWithRows(rawData);
    return (

      <View>
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
                        dataSource={list}
                        renderRow={(item) => <ShowItem imageUrl={item.image_url} title={item.title} description={item.description} rss={item.feed_url} match={this.props.match} />}
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
