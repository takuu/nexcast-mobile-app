'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'

import Actions from '../lib/ActionsMock';

import Header from '../components/Header'

import ErrorAlert from '../components/ErrorAlert'

import FormButton from '../components/FormButton'

import LoginForm from '../components/LoginForm'

import ItemCheckbox from '../components/ItemCheckbox'

import React, {Component} from 'react'
import
{
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  View
}
from 'react-native'

import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  inputs: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  forgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
})

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class LoginRender extends Component {
  constructor (props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      value: {
        username: this.props.auth.form.fields.username,
        email: this.props.auth.form.fields.email,
        password: this.props.auth.form.fields.password,
        passwordAgain: this.props.auth.form.fields.passwordAgain
      }
    }
  }

  componentWillReceiveProps (nextprops) {
    this.setState({
      value: {
        username: nextprops.auth.form.fields.username,
        email: nextprops.auth.form.fields.email,
        password: nextprops.auth.form.fields.password,
        passwordAgain: nextprops.auth.form.fields.passwordAgain
      }
    })
  }

  onChange (value) {
    if (value.username !== '') {
      this.props.actions.onAuthFormFieldChange('username', value.username)
    }
    if (value.email !== '') {
      this.props.actions.onAuthFormFieldChange('email', value.email)
    }
    if (value.password !== '') {
      this.props.actions.onAuthFormFieldChange('password', value.password)
    }
    if (value.passwordAgain !== '') {
      this.props.actions.onAuthFormFieldChange('passwordAgain', value.passwordAgain)
    }
    this.setState(
      {value}
    )
  }

  getMessage (messageType, actions) {
    let forgotPassword =
      <TouchableHighlight
        onPress={() => {
          actions.forgotPasswordState()
          Actions.ForgotPassword()
        }} >
        <Text>{I18n.t('LoginRender.forgot_password')}</Text>
      </TouchableHighlight>

    let alreadyHaveAccount =
      <TouchableHighlight
        onPress={() => {
          actions.loginState()
          Actions.Login()
        }} >
        <Text>{I18n.t('LoginRender.already_have_account')}</Text>
      </TouchableHighlight>

    let register =
      <TouchableHighlight
        onPress={() => {
          actions.registerState()
          Actions.Register()
        }} >
        <Text>{I18n.t('LoginRender.register')}</Text>
      </TouchableHighlight>

    switch (messageType) {
      case FORGOT_PASSWORD:
        return forgotPassword
      case LOGIN:
        return alreadyHaveAccount
      case REGISTER:
        return register
    }
  }

  render () {
    var formType = this.props.formType
    var loginButtonText = this.props.loginButtonText
    var onButtonPress = this.props.onButtonPress
    var displayPasswordCheckbox = this.props.displayPasswordCheckbox
    var leftMessageType = this.props.leftMessageType
    var rightMessageType = this.props.rightMessageType

    var passwordCheckbox = <Text />
    let leftMessage = this.getMessage(leftMessageType, this.props.actions)
    let rightMessage = this.getMessage(rightMessageType, this.props.actions)

    let self = this

    // display the login / register / change password screens
    this.errorAlert.checkError(this.props.auth.form.error)

    if (displayPasswordCheckbox) {
      passwordCheckbox =
        <ItemCheckbox
          text={I18n.t('LoginRender.show_password')}
          disabled={this.props.auth.form.isFetching}
          onCheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', true)
          }}
          onUncheck={() => {
            this.props.actions.onAuthFormFieldChange('showPassword', false)
          }}
      />
    }

    return (
      <View style={styles.container}>
        <ScrollView horizontal={false} width={width} height={height}>
          <View>
            <Header isFetching={this.props.auth.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />

            <View style={styles.inputs}>
              <LoginForm
                formType={formType}
                form={this.props.auth.form}
                value={this.state.value}
                onChange={self.onChange.bind(self)} />
              {passwordCheckbox}
            </View>

            <FormButton
              isDisabled={!this.props.auth.form.isValid || this.props.auth.form.isFetching}
              onPress={onButtonPress}
              buttonText={loginButtonText} />

            <View >
              <View style={styles.forgotContainer}>
                {leftMessage}
                {rightMessage}
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    )
  }
}
export default connect(null, mapDispatchToProps)(LoginRender)
