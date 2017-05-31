'use strict'

import {Record} from 'immutable'

var TaggedShowRecord = Record({

  "podcast_sid": "",
  "users_sid": "",
  "title": "",
  "imageurl": "",
  "published_date": "",
  "language": "",
  "author": "",
  "keywords": "",
  "owner_email": "",
  "owner_name": "",
  "pc_desc": "",
  "rssurl": "",
  "created_at": "",
  "updated_at": ""

});

class TaggedShowInitial extends TaggedShowRecord {
  isDone() {
    return this.get('done');
  }

}
export default TaggedShowInitial
