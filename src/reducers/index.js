/**
 * # reducers
 *
 * This class combines all the reducers into one
 *
 */
'use strict'
/**
 * ## Imports
 *
 * our 4 reducers
 */
import auth from './auth/authReducer'
import device from './device/deviceReducer'
import global from './global/globalReducer'
import podcasts from './discover/discoverReducer';
import podcastInfo from './podcast/podcastReducer';
import profile from './profile/profileReducer'
import taggedShows from './taggedShow/taggedShowReducer'
import showDetail from './showDetail/showDetailReducer'
import player from './player/playerReducer'
import podcastHistory from './podcastHistory/podcastHistoryReducer'
import subscription from './subscription/subscriptionReducer'
import tags from './tag/tagReducer'
import searchShows from './search/searchReducer'

import { combineReducers } from 'redux'

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  auth,
  device,
  global,
  profile,
  podcasts,
  podcastInfo,
  taggedShows,
  showDetail,
  player,
  podcastHistory,
  subscription,
  tags,
  searchShows
});

export default rootReducer
