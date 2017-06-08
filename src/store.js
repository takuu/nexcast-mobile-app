'use strict'

// Redux
import { applyMiddleware, combineReducers, createStore } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducers'

console.log('Store: ', 'foo');

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

function configureStore (initialState) {
  return createStoreWithMiddleware(reducer, initialState)
}

let store = configureStore({});

export default store;