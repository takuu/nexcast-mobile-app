'use strict'

import {Record} from 'immutable'

/*
 "id": "3c8865ee08ca6686c37fd677b7451698",
 "title": "Twenty Thousand Hertz",
 "imageurl": "http:\/\/static.libsyn.com\/p\/assets\/7\/e\/c\/b\/7ecb8d382f02537c\/20kHz-s1-ArtworkiTunes.jpg",
 "published_date": "Tue, 29 Nov 2016 16:57:28 +0000",
 "language": "en",
 "author": "Defacto Sound",
 "keywords": "",
 "owner_email": "dallas@20k.org",
 "owner_name": "Dallas Taylor",
 "long_desc": "The stories behind the world's most recognizable and interesting sounds. ",
 */

// TODO: This is the exact same as showDetailInitialState

var SubscriptionRecord = Record({
  "id": "",
  "title": "",
  "image_url": "",
  "release_date": "",
  "language": "",
  "artist_name": "",
  "keywords": "",
  "owner_name": "",
  "description": "",
  "feed_url": "",
  "episodes": []

});

class SubscriptionInitial extends SubscriptionRecord {
  isDone() {
    return this.get('done');
  }
}
export default SubscriptionInitial
