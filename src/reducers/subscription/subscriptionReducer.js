const {
  SET_SUBSCRIPTION_REQUEST,
  SET_SUBSCRIPTION_SUCCESS,
  SET_SUBSCRIPTION_FAILURE,
  REMOVE_SUBSCRIPTION_REQUEST,
  REMOVE_SUBSCRIPTION_SUCCESS,

  GET_ALL_SUBSCRIPTION_SUCCESS,

} = require('../../lib/constants').default;
import Immutable from 'immutable';

const initialState = new Immutable.Map();

const mapEntities = (state, newSubscription) => {
  return state.set(newSubscription.rss, newSubscription);
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SUBSCRIPTION_REQUEST:
      break;
    case SET_SUBSCRIPTION_SUCCESS:
      console.log('SET_SUBSCRIPTION_SUCCESS: ', action.payload);
      if (!action.payload) { return state }
      // return mapEntities(state, action.payload);
      state = Immutable.fromJS(action.payload);
      break;

    case REMOVE_SUBSCRIPTION_REQUEST:
    case REMOVE_SUBSCRIPTION_SUCCESS:
      if (!action.payload) { return state }
      state = Immutable.fromJS(action.payload);
      break;

    case GET_ALL_SUBSCRIPTION_SUCCESS:
      // TODO: do a state = fromJS(action.payload)
      state = Immutable.fromJS(action.payload);
      break;

    default:
      return state;
  }
  return state;
}

