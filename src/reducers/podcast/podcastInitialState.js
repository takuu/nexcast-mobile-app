'use strict'

import {Record} from 'immutable'

/*
 {
 "id": 1129027545,
 "title": "Building Nexcast - An Inside Look at Growing a Startup Business",
 "feed_url": "http://feeds.feedburner.com/BuildingNexcast/rss",
 "description": "",
 "image_url": "http://is1.mzstatic.com/image/thumb/Music62/v4/22/9b/35/229b3566-689e-f3a5-c069-39ade4222cdf/source/100x100bb.jpg",
 "email": "",
 "verified": null,
 "artist_name": "Nexcast",
 "release_date": "2016-12-14T07:34:00.000Z",
 "artist_image_url": null,
 "primary_genre_id": 1410,
 "created_at": "2017-05-26T03:47:30.725Z",
 "updated_at": "2017-05-28T20:29:21.782Z"
 }
 */

var ShowDetailRecord = Record({

  "id": "",
  "title": "",
  "feed_url": "",
  "image_url": "",
  "release_date": "",
  "language": "",
  "artist_name": "",
  "keywords": "",
  "owner_email": "",
  "owner_name": "",
  "long_desc": "",

});

class ShowDetailInitial extends ShowDetailRecord {
  isDone() {
    return this.get('done');
  }

}
export default ShowDetailInitial
