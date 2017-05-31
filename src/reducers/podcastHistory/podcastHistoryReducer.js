const {
  SET_PODCAST_HISTORY_REQUEST,
  SET_PODCAST_HISTORY_SUCCESS,
  SET_PODCAST_HISTORY_FAILURE,

  REMOVE_PODCAST_HISTORY_REQUEST,
  REMOVE_PODCAST_HISTORY_SUCCESS,
  REMOVE_PODCAST_HISTORY_FAILURE,

  GET_ALL_PODCAST_HISTORY_SUCCESS,

  GET_NEXT_PODCAST_HISTORY_SUCCESS,
} = require('../../lib/constants').default;
import Immutable from 'immutable';
import {AsyncStorage} from 'react-native';

const initialState = new Immutable.Map();

const mapEntities = (state, newHistory) => {
  return state.set(newHistory.mediaUrl, newHistory);
};

const HISTORY_KEY = 'HISTORY_STORAGE';


export default (state = initialState, action) => {
  switch(action.type) {
    case SET_PODCAST_HISTORY_REQUEST:
      break;
    case SET_PODCAST_HISTORY_SUCCESS:
      if (!action.payload) { return state }
      state = Immutable.fromJS(action.payload);
    case REMOVE_PODCAST_HISTORY_REQUEST:
      break;
    case REMOVE_PODCAST_HISTORY_SUCCESS:
      if (!action.payload) { return state }
      state = Immutable.fromJS(action.payload);
    case GET_NEXT_PODCAST_HISTORY_SUCCESS:
      if (!action.payload) { return state }
      state = Immutable.fromJS(action.payload);
    case SET_PODCAST_HISTORY_FAILURE:
      break;
    case GET_ALL_PODCAST_HISTORY_SUCCESS:
      // TODO: do a state = fromJS(action.payload)
      state = Immutable.fromJS(action.payload);
      break;
    default:
      return state;

  }
  return state;
}
