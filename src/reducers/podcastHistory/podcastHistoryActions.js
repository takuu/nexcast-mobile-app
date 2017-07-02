const {
  SET_PODCAST_HISTORY_REQUEST,
  SET_PODCAST_HISTORY_SUCCESS,
  SET_PODCAST_HISTORY_FAILURE,

  REMOVE_PODCAST_HISTORY_REQUEST,
  REMOVE_PODCAST_HISTORY_SUCCESS,
  REMOVE_PODCAST_HISTORY_FAILURE,

  GET_NEXT_PODCAST_HISTORY_REQUEST,
  GET_NEXT_PODCAST_HISTORY_SUCCESS,
  GET_NEXT_PODCAST_HISTORY_FAILURE,

  GET_ALL_PODCAST_HISTORY_SUCCESS,

  PLAYER_START_REQUEST,
  PLAYER_START_SUCCESS,
  PLAYER_START_FAILURE,
} = require('../../lib/constants').default;

import * as podcastHistoryStorage from './podcastHistoryStorage';

import Immutable from 'immutable';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

export function playerStartRequest (json) { return { type: PLAYER_START_REQUEST, payload: json }}
export function playerStartSuccess (json) { return { type: PLAYER_START_SUCCESS, payload: json }}
export function playerStartFailure (json) { return { type: PLAYER_START_FAILURE, payload: json }}

export function getNextPodcastHistoryRequest () {

}

export function getNextPodcastHistorySuccess (json) {
  return {
    type: GET_NEXT_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}

export function getNextPodcastHistoryFailure () {

}

export function setPodcastHistoryRequest () {
  return {
    type: SET_PODCAST_HISTORY_REQUEST
  }
}
export function setPodcastHistorySuccess (json) {
  return {
    type: SET_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}
export function setPodcastHistoryFailure (err) {
  return {
    type: SET_PODCAST_HISTORY_FAILURE,
    payload: err
  }
}

export function removePodcastHistoryRequest () {
  return {
    type: SET_PODCAST_HISTORY_REQUEST
  }
}
export function removePodcastHistorySuccess (json) {
  return {
    type: SET_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}
export function removePodcastHistoryFailure (err) {
  return {
    type: SET_PODCAST_HISTORY_FAILURE,
    payload: err
  }
}

export function getAllPodcastHistorySuccess (json) {
  return {
    type: GET_ALL_PODCAST_HISTORY_SUCCESS,
    payload: json
  }
}

const HISTORY_KEY = 'HISTORY_STORAGE';


export function getAllPodcastHistory () {

  // AsyncStorage.removeItem(HISTORY_KEY, (err) => {});
  return async dispatch => {
    try {
      const history = await podcastHistoryStorage.getAllHistory();
      dispatch(getAllPodcastHistorySuccess(history));
    } catch (error) {
      console.log('podcastHistoryActions.getAllPodcastHistory error: ', error);
    }

  }
}

export function getNextPodcastHistory (currentEpisode) {
  console.log('getNextPodcastHistory() was called');

  // AsyncStorage.removeItem(HISTORY_KEY, (err) => {});
  return async dispatch => {
    let next;
    try {
      next = await podcastHistoryStorage.getNextHistory(currentEpisode);
      dispatch(playerStartSuccess(next));
    } catch (error) {
      console.log('getNextPodcastHistory PodcastHistory error: ', error);
    }
    return next;
  }
}


export function removePodcastHistory (episode={}) {
  return async dispatch => {

    dispatch(removePodcastHistoryRequest());

    try {
      let newHistory = await podcastHistoryStorage.removeHistory(episode);
      dispatch(removePodcastHistorySuccess(newHistory));
    } catch (error) {
      console.log('getNextPodcastHistory PodcastHistory error: ', error);
    }
  }
}


// This is unused.......
export function setPodcastHistoryDeprecated (episode={}) {
  return async dispatch => {
    try {
      let historyHash = await AsyncStorage.getItem(HISTORY_KEY) || {};
      historyHash = JSON.parse(historyHash);
      historyHash[episode.mediaUrl] = _.merge(historyHash[episode.mediaUrl], episode);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(historyHash));
      dispatch(setPodcastHistorySuccess(historyHash));
    } catch (error) {

    }

  }
}
