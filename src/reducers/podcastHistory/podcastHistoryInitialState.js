'use strict'

import {Record} from 'immutable'

/*
 PLAYING: 1,
 PAUSED: 2,
 LOADING: 3,
 STOPPED: 4,
*/

var PodcastHistoryRecord = Record({
  "playerStatus": "",
  "playPosition": "",
  "playCount": "",
  "duration": "",
  "progress": "",
  "mediaUrl": "",
  "rss": "",
  "title": "",
  "episodeTitle": "",
  "description": "",
  "imageUrl": "",
  "lastPlayed": ""
});

class PodcastHistoryInitial extends PodcastHistoryRecord {
  isDone() {
    return this.get('done');
  }
}
export default PodcastHistoryInitial
