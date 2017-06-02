'use strict'

import {Record} from 'immutable'

var PodcastRecord = Record({

  "ranking_sid": "",
  "title": "",
  "rss_feed_id": "",
  "feed_url": "",
  "description": "",
  "image_url": "",
  "ranking": "",
  "genre_id": "",
  "genre_name": "",
  "created_at": "",
  "updated_at": "",
  "tag": ""

});

/*
 {
 "ranking_sid": 7213516,
 "name": "How I Built This",
 "rss_feed_id": "4ceeb32af1f75bae45151f15805f4359",
 "rss_feed": "http:\/\/www.npr.org\/rss\/podcast.php?id=510313",
 "summary": "How I Built This is a podcast about innovators, entrepreneurs, and idealists, and the stories behind the movements they built. Each episode is a narrative journey marked by triumphs, failures, serendipity and insight \u2014 told by the founders of some of the world's best known companies and brands. If you've ever built something from nothing, something you really care about \u2014 or even just dream about it \u2014 check out How I Built This hosted by Guy Raz @guyraz. Follow the show @HowIBuiltThis.",
 "artworkUrl100": "http:\/\/is2.mzstatic.com\/image\/thumb\/Music111\/v4\/f3\/fd\/55\/f3fd5554-85a3-aefc-f045-59ebe1bb8a58\/source\/100x100bb.jpg",
 "ranking": 1,
 "genre_id": 1321,
 "genre_name": "Business",
 "created_at": "2016-12-10 00:01:57",
 "updated_at": "2016-12-10 00:01:57",
 "tag": 5
 }
 */

class PodcastInitial extends PodcastRecord {
  isDone() {
    return this.get('done');
  }

  getLabel() {
    return this.get('label') || 'New Task';
  }
}
export default PodcastInitial
