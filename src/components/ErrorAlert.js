
'use strict'


import SimpleAlert from 'react-native-simpledialog-android'
import _ from 'underscore'

var ErrorAlert = class ErrorAlertClass {
  checkError (obj) {
    let errorMessage = ''
    if (!_.isNull(obj)) {
      if (!_.isUndefined(obj.error)) {
        if (!_.isUndefined(obj.error.error)) {
          errorMessage = obj.error.error
        } else {
          errorMessage = obj.error
        }
      } else {
        errorMessage = obj
      }
      if (errorMessage !== '') {
        if (!_.isUndefined(errorMessage.message)) {
          SimpleAlert.alert('Error', errorMessage.message)
        } else {
          SimpleAlert.alert('Error', errorMessage)
        }
      }
    }// isNull
  }
}

module.exports = ErrorAlert
