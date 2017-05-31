/*
 "wrapperType": "track",
 "kind": "podcast",
 "artistId": 825701899,
 "collectionId": 496893300,
 "trackId": 496893300,
 "artistName": "DevChat.tv",
 "collectionName": "JavaScript Jabber",
 "trackName": "JavaScript Jabber",
 "collectionCensoredName": "JavaScript Jabber",
 "trackCensoredName": "JavaScript Jabber",
 "artistViewUrl": "https:\/\/itunes.apple.com\/us\/artist\/devchat.tv\/id825701899?mt=2&uo=4",
 "collectionViewUrl": "https:\/\/itunes.apple.com\/us\/podcast\/javascript-jabber\/id496893300?mt=2&uo=4",
 "feedUrl": "https:\/\/feeds.feedwrench.com\/JavaScriptJabber.rss",
 "trackViewUrl": "https:\/\/itunes.apple.com\/us\/podcast\/javascript-jabber\/id496893300?mt=2&uo=4",
 "artworkUrl30": "http:\/\/is3.mzstatic.com\/image\/thumb\/Music62\/v4\/e2\/81\/50\/e281506b-17b8-fa60-c49a-984076400194\/source\/30x30bb.jpg",
 "artworkUrl60": "http:\/\/is3.mzstatic.com\/image\/thumb\/Music62\/v4\/e2\/81\/50\/e281506b-17b8-fa60-c49a-984076400194\/source\/60x60bb.jpg",
 "artworkUrl100": "http:\/\/is3.mzstatic.com\/image\/thumb\/Music62\/v4\/e2\/81\/50\/e281506b-17b8-fa60-c49a-984076400194\/source\/100x100bb.jpg",
 "collectionPrice": 0,
 "trackPrice": 0,
 "trackRentalPrice": 0,
 "collectionHdPrice": 0,
 "trackHdPrice": 0,
 "trackHdRentalPrice": 0,
 "releaseDate": "2016-12-07T13:00:00Z",
 "collectionExplicitness": "notExplicit",
 "trackExplicitness": "notExplicit",
 "trackCount": 241,
 "country": "USA",
 "currency": "USD",
 "primaryGenreName": "Training",
 "artworkUrl600": "http:\/\/is3.mzstatic.com\/image\/thumb\/Music62\/v4\/e2\/81\/50\/e281506b-17b8-fa60-c49a-984076400194\/source\/600x600bb.jpg",
 "genreIds": ["1470", "26", "1304", "1318", "1480"],
 "genres": ["Training", "Podcasts", "Education", "Technology", "Software How-To"]
 */

'use strict'

import {Record} from 'immutable'

var SearchRecord = Record({

  "wrapperType": "",
  "kind": "",
  "artistId": "",
  "collectionId": "",
  "trackId": "",
  "artistName": "",
  "collectionName": "",
  "trackName": "",
  "collectionCensoredName": "",
  "trackCensoredName": "",
  "artistViewUrl": "",
  "collectionViewUrl": "",
  "feedUrl": "",
  "trackViewUrl": "",
  "artworkUrl30": "",
  "artworkUrl60": "",
  "artworkUrl100": "",
  "collectionPrice": "",
  "trackPrice": "",
  "trackRentalPrice": "",
  "collectionHdPrice": "",
  "trackHdPrice": "",
  "trackHdRentalPrice": "",
  "releaseDate": "",
  "collectionExplicitness": "",
  "trackExplicitness": "",
  "trackCount": "",
  "country": "",
  "currency": "",
  "primaryGenreName": "",
  "artworkUrl600": "",
  "genreIds": [],
  "genres": []
});

class SearchInitial extends SearchRecord {
  isDone() {
    return this.get('done');
  }

}
export default SearchInitial

