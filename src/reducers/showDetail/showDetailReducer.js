const {
  GET_EPISODES_REQUEST,
  GET_EPISODES_SUCCESS,
  GET_EPISODES_FAILURE,

} = require('../../lib/constants').default
import Immutable from 'immutable';

import showDetailInitial from './showDetailInitialState'

const initialState = new Immutable.Map();


const mapEntities = (state, newShowDetail) => {
  return state.set(newShowDetail.rss, newShowDetail);
};


export default (state = initialState, action) => {
  switch(action.type) {
    // Handles some UI actions
    case GET_EPISODES_REQUEST:
    case GET_EPISODES_FAILURE:
    // Received pocasts data from an external API
          break;
    case GET_EPISODES_SUCCESS:
      console.log('GET_EPISODES_SUCCESS: ', action.payload);
      if (!action.payload) { return state }

      return mapEntities(state, action.payload);

  }
  return state;
}
