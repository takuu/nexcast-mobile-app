'use strict';

const {
  GET_EPISODES_REQUEST,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,
  GET_PODCAST_SUCCESS,
  GET_PODCAST_FAILURE,

} = require('../../lib/constants').default;

const BackendFactory = require('../../lib/BackendFactory').default;
import _ from 'lodash';
import * as helpers from '../../lib/helpers';
import CONFIG from '../../lib/config'

export function getEpisodesRequest () {
  return {
    type: GET_EPISODES_REQUEST
  }
}
export function getEpisodesSuccess (json) {
  return {
    type: GET_EPISODES_SUCCESS,
    payload: json
  }
}
export function getEpisodesFailure (err) {
  return {
    type: GET_EPISODES_FAILURE,
    payload: err
  }
}


export function getPodcastSuccess (json) {
  return {
    type: GET_PODCAST_SUCCESS,
    payload: json
  }
}
export function getPodcastFailure (err) {
  return {
    type: GET_PODCAST_FAILURE,
    payload: err
  }
}

export function getPodcast (rss = '') {
  return async (dispatch) =>  {
    try {
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);
      if(tokenResult.status == 1) {

      } else {
        // stuff failed to token initialize
      }
    } catch(err) {

    }
  }
}

export function getEpisodes (rss = '') {

  return async (dispatch) => {
    try {
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);

      if(tokenResult.status == 1) {
        const {token} = tokenResult;
        const episodesResult = await BackendFactory(token).getEpisodes(rss);
        if (episodesResult.status == 1) {
          let {result} = episodesResult;
          const episodes = _.map(result, (episode) => {
            episode.title = episode.title.replace('↵', '');
            episode.rss = rss;
            return episode
          });
          dispatch(getEpisodesSuccess(episodes));
        } else {
          dispatch(getEpisodesFailure({error: 'err: fetching episodes failed'}));
        }
      } else {
        // Failed to get token
      }
    } catch (error) {
      console.log('general error2: ', error);
    }
  };


}
