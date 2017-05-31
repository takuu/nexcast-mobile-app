'use strict'

import {Record} from 'immutable'

/*
 "id": "9a2d63e88cd3ea202d447e2945f33f42",
 "title": "The Tim Ferriss Show",
 "imageurl": "http:\/\/static.libsyn.com\/p\/assets\/5\/a\/8\/7\/5a87e01004b980c1\/TimFerrissShowArt1400x1400.jpg",
 "published_date": "Sat, 10 Dec 2016 15:00:30 +0000",
 "language": "en",
 "author": "Tim Ferriss: Bestselling Author, Human Guinea Pig",
 "keywords": "4hour,fourhour,podcast,timferris,timferriss,timothyferris,timothyferriss,workweek",
 "owner_email": "",
 "owner_name": "",
 "long_desc": "Tim Ferriss is a self-experimenter and bestselling author, best known for The 4-Hour Workweek, which has been translated into 40+ languages.  Newsweek calls him \"the world's best human guinea pig,\" and The New York Times calls him \"a cross between Jack Welch and a Buddhist monk.\"  In this show, he deconstructs world-class performers from eclectic areas (investing, chess, pro sports, etc.), digging deep to find the tools, tactics, and tricks that listeners can use.",


 */

var ShowDetailRecord = Record({

  "id": "",
  "title": "",
  "rss": "",
  "imageurl": "",
  "published_date": "",
  "language": "",
  "author": "",
  "keywords": "",
  "owner_email": "",
  "owner_name": "",
  "long_desc": "",
  "episodes": []

});

class ShowDetailInitial extends ShowDetailRecord {
  isDone() {
    return this.get('done');
  }

}
export default ShowDetailInitial
