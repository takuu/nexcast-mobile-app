'use strict'

import React, {PropTypes} from 'react'

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../lib/constants').default

const t = require('tcomb-form-native')
let Form = t.form.Form

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

var LoginForm = React.createClass({

  propTypes: {
    formType: PropTypes.string,
    form: PropTypes.object,
    value: PropTypes.object,
    onChange: PropTypes.func
  },

  render () {
    let formType = this.props.formType

    let options = {
      fields: {
      }
    }

    let username = {
      label: I18n.t('LoginForm.username'),
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.usernameHasError,
      error: this.props.form.fields.usernameErrorMsg
    }

    let email = {
      label: I18n.t('LoginForm.email'),
      keyboardType: 'email-address',
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.emailHasError,
      error: this.props.form.fields.emailErrorMsg
    }

    let secureTextEntry = !this.props.form.fields.showPassword

    let password = {
      label: I18n.t('LoginForm.password'),
      maxLength: 12,
      secureTextEntry: secureTextEntry,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordHasError,
      error: this.props.form.fields.passwordErrorMsg
    }

    let passwordAgain = {
      label: I18n.t('LoginForm.password_again'),
      secureTextEntry: secureTextEntry,
      maxLength: 12,
      editable: !this.props.form.isFetching,
      hasError: this.props.form.fields.passwordAgainHasError,
      error: this.props.form.fields.passwordAgainErrorMsg
    }

    let loginForm
    switch (formType) {

      case (REGISTER):
        loginForm = t.struct({
          username: t.String,
          email: t.String,
          password: t.String,
          passwordAgain: t.String
        })
        options.fields['username'] = username
        options.fields['username'].placeholder = I18n.t('LoginForm.username')
        options.fields['username'].autoCapitalize = 'none'
        options.fields['email'] = email
        options.fields['email'].placeholder = I18n.t('LoginForm.email')
        options.fields['email'].autoCapitalize = 'none'
        options.fields['password'] = password
        options.fields['password'].placeholder = I18n.t('LoginForm.password')
        options.fields['passwordAgain'] = passwordAgain
        options.fields['passwordAgain'].placeholder = I18n.t('LoginForm.password_again')
        break

      case (LOGIN):
        loginForm = t.struct({
          username: t.String,
          password: t.String
        })
        options.fields['username'] = username
        options.fields['username'].placeholder = I18n.t('LoginForm.username')
        options.fields['username'].autoCapitalize = 'none'
        options.fields['password'] = password
        options.fields['password'].placeholder = I18n.t('LoginForm.password')
        break

      case (FORGOT_PASSWORD):
        loginForm = t.struct({
          email: t.String
        })
        options.fields['email'] = email
        options.fields['email'].autoCapitalize = 'none'
        options.fields['email'].placeholder = I18n.t('LoginForm.email')
        break
    } // switch

    return (
      <Form ref='form'
        type={loginForm}
        options={options}
        value={this.props.value}
        onChange={this.props.onChange}
      />

    )
  }
})

module.exports = LoginForm
