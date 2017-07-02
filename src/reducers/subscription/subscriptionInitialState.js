'use strict'

import {Record} from 'immutable'

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
