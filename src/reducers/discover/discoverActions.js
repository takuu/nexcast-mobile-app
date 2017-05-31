'use strict'

const {
  GET_POPULAR_REQUEST,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAILURE,

  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../lib/constants').default
import CONFIG from '../../lib/config'

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'

/**
 * ## retreiving profile actions
 */

export function getPopularRequest () {
  return {
    type: GET_POPULAR_REQUEST
  }
}
export function getPopularSuccess (json) {
  return {
    type: GET_POPULAR_SUCCESS,
    payload: json
  }
}
export function getPopularFailure (err) {
  return {
    type: GET_POPULAR_FAILURE,
    payload: err
  }
}





export function getCategoryRequest () {
  return {
    type: GET_CATEGORY_REQUEST
  }
}
export function getCategorySuccess (json) {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: json
  }
}
export function getCategoryFailure (err) {
  return {
    type: GET_CATEGORY_FAILURE,
    payload: err
  }
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function getPopular () {
  return dispatch => {
    dispatch(getPopularRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getPopularFailure({error: 'err: never got token'}));
        return BackendFactory(json.token).getPopular()
      }).then((data) => {

        let json = (typeof data === 'string') ? JSON.parse(data): data;
        (json.status == 1) ?
          dispatch(getPopularSuccess(json.result)) :
          dispatch(getPopularFailure({error: 'err: server status 0'}));

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getPopularFailure(error))
      })
  }
}


export function getCategoryOld (id) {
  return dispatch => {
    dispatch(getCategoryRequest(id))
    return BackendFactory().getCategory(id)
      .then((json) => {
        dispatch(getCategorySuccess(json))

        // GOTO SOME PAGE
        // Actions.somePage()
      })
      .catch((error) => {
        dispatch(getCategoryFailure(error))
      })
  }
}
export function getCategory (id) {
  return dispatch => {
    dispatch(getCategoryRequest())

    return BackendFactory().registerThisDevice(CONFIG.deviceUID).then((json) => {
      if(!json && !json.token) dispatch(getCategoryFailure({error: 'err: never got token'}));
      return BackendFactory(json.token).getCategory(id)
    }).then((data) => {
      let json = (typeof data === 'string') ? JSON.parse(data): data;
      (json.status == 1) ?
        dispatch(getCategorySuccess(json.result)) :
        dispatch(getCategoryFailure({error: 'err: server status 0'}));

      // GOTO SOME PAGE
      // Actions.somePage()
    })
      .catch((error) => {
        dispatch(getCategoryFailure(error))
      })
  }
}


/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
export function profileUpdateRequest () {
  return {
    type: PROFILE_UPDATE_REQUEST
  }
}
export function profileUpdateSuccess () {
  return {
    type: PROFILE_UPDATE_SUCCESS
  }
}
export function profileUpdateFailure (json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  }
}
/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} sessionToken - the sessionToken
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the serverx
 *
 */
export function updateProfile (userId, username, email, sessionToken) {
  return dispatch => {
    dispatch(profileUpdateRequest())
    return appAuthToken.getSessionToken(sessionToken)
      .then((token) => {
        return BackendFactory(token).updateProfile(userId,
          {
            username: username,
            email: email
          }
        )
      })
      .then(() => {
        dispatch(profileUpdateSuccess())
        dispatch(getProfile())
      })
      .catch((error) => {
        dispatch(profileUpdateFailure(error))
      })
  }
}
/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange (field, value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

