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
  console.log('getEpisodesFailure: ', err);
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
  console.log('getPodcastFailure: ', err);
  return {
    type: GET_PODCAST_FAILURE,
    payload: err
  }
}

export function getPodcast (rss = '') {
  return async (dispatch) =>  {
    try {
      console.log('starting getPodcast: ');
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);
      console.log('tokenResult: ', tokenResult);
      if(tokenResult.status == 1) {

      } else {
        // stuff failed to token initialize
      }
    } catch(err) {

    }
  }
}

export function getEpisodes (rss = '') {
  console.log('getEpisodes() was called');
  return async (dispatch) => {
    try {
      console.log('starting getEpisodes: ');
      const tokenResult = await BackendFactory().registerThisDevice(CONFIG.deviceUID);
      console.log('tokenResult: ', tokenResult);
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


/*  return dispatch => {
    dispatch(getEpisodesRequest());
    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getEpisodesFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getEpisodes(rss);
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;
      console.log('getEpisodes (raw): ', json);
      if (json.status == 1) {
        json.result.rss = rss;
        json.result.episodes = _.map(json.result.episodes, (episode) => {
          episode.durationFormatted = episode.duration;
          episode.duration = helpers.hmsToSecondsOnly(episode.duration);
          episode.title = episode.title.replace('↵', '');
          return episode;
        });
        dispatch(getEpisodesSuccess(json.result))
      } else {
        dispatch(getEpisodesFailure({error: 'err: server status 0'}));
      }
    })
      .catch((error) => {
      console.log('cannot get token');
        dispatch(getEpisodesFailure(error));
      })
  }*/
}
