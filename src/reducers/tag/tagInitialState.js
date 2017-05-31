
/*
 "cards_sid": 2,
 "podcast_sid": 2,
 "podcast_key": "66ead32a241c23fd0834b42ecd4992bf",
 "podcast_rssurl": "http:\/\/feeds.feedburner.com\/BuildingNexcast\/rss",
 "episode_key": "c6a8f5893c9d140d438fca4927b9d12f",
 "media_location": "http:\/\/traffic.libsyn.com\/buildingnexcast\/Part_1_-_Schooled_by_Silicon_Valley.mp3?dest-id=397005",
 "time": "00:00:00",
 "content": "Part 1 of the epic journey in building the podcast app and platform, Nexcast, begins with a trip to Silicon Valley. Brian Sanders, the CEO and host of the show, travels to San Francisco to pitch his company for the first time ever. The pressure of this challenging start is heightened by visiting the headquarters of two of the biggest tech companies in the world, Apple and Facebook, and seeing what the team is up against.\r\n\r\nCheck out the site at http:\/\/BuildingNexcast.com\r\n\r\nGet early access to the app by adding your email to http:\/\/nexcast.co\r\n\r\nLet us know your feedback and suggestions on Twitter http:\/\/twitter.com\/buildingnexcast\r\n\r\nOr just email us at hi@nexcast.co",
 "button1_text": "",
 "button1_link": "",
 "image_location": "2.jpg",
 "youtube_location": null,
 "status": 1,
 "created_at": "2016-10-19 11:16:03",
 "updated_at": "2016-10-19 11:16:03"

 */

/*
 "cards_sid": 450,
 "podcast_sid": 2,
 "podcast_key": "66ead32a241c23fd0834b42ecd4992bf",
 "podcast_rssurl": "http:\/\/feeds.feedburner.com\/BuildingNexcast\/rss",
 "episode_key": "f15a1c3708b441bbce3eccd115e5e16f",
 "media_location": "http:\/\/traffic.libsyn.com\/buildingnexcast\/Intermission-_Angel_Investor_and_Podcast_Star_at_18_-_Harry_Stebbings.mp3?dest-id=397005",
 "time": "00:00:00",
 "content": "We\u2019re back!! We\u2019ve been hard at work trying to get our private beta out, so apologies for the delay. This week we take another intermission from our story to interview one of the world\u2019s biggest tech podcasters, who happens to be 20 and lives in the U.K. (neither of those are typos\u2026).\r\n\r\nHarry Stebbings is nothing short of a podcasting extraordinaire. We got the chance to ask him a few questions about his story and how he built his podcast from basically nothing. Listen in for a fascinating interview with a rare talent and an incredibly interesting podcaster, Mr. Harry Stebbings.\r\n\r\nCheck out the site at http:\/\/buildingnexcast.com\r\n\r\nGet early access to the app by adding your email to http:\/\/nexcast.co\r\n\r\nLet us know your feedback and suggestions on Twitter http:\/\/twitter.com\/buildingnexcast\r\n\r\nOr just email us at hi@nexcast.co",
 "button1_text": "Episode Site",
 "button1_link": "http:\/\/buildingnexcast.com\/?episode=intermission-angel-investor-and-podcast-star-at-18-harry-stebbings",
 "image_location": "http:\/\/www.nexcast.co\/users\/media\/450\/450.jpg",
 "youtube_location": null,
 "status": 1,
 "created_at": "2016-11-02 11:37:12",
 "updated_at": "2016-11-02 11:37:12",
 "seconds": 0
 */

'use strict'

import {Record} from 'immutable'

var TagRecord = Record({

  "cards_sid": "",
  "podcast_sid": "",
  "podcast_key": "",
  "podcast_rssurl": "",
  "episode_key": "",
  "media_location": "",
  "time": "",
  "content": "",
  "button1_text": "",
  "button1_link": "",
  "image_location": "",
  "youtube_location": "",
  "status": "",
  "created_at": "",
  "updated_at": ""

});

class TagInitial extends TagRecord {
  isDone() {
    return this.get('done');
  }

}
export default TagInitial
