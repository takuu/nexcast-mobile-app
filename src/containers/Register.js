'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as authActions from '../reducers/auth/authActions'

import LoginRender from '../components/LoginRender'

import React from 'react'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default

function mapStateToProps (state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler (signup, username, email, password) {
  signup(username, email, password)
}

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let Register = React.createClass({

  render () {
    let loginButtonText = I18n.t('Register.register')
    let onButtonPress = buttonPressHandler.bind(null,
                                                this.props.actions.signup,
                                                this.props.auth.form.fields.username,
                                                this.props.auth.form.fields.email,
                                                this.props.auth.form.fields.password)

    return (
      <LoginRender
        formType={REGISTER}
        loginButtonText={loginButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox
        leftMessageType={FORGOT_PASSWORD}
        rightMessageType={LOGIN}
        auth={this.props.auth}
        global={this.props.global}
      />

    )
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)
