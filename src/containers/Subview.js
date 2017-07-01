
'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Actions from '../lib/ActionsMock';

import NavigationBar from 'react-native-navbar'

import React from 'react'
import
{
  StyleSheet,
  View,
  Text
}
from 'react-native'

import * as deviceActions from '../reducers/device/deviceActions'

function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
})

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let Subview = React.createClass({

  render () {
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }

    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }

    return (
      <View>
        <NavigationBar
          title={titleConfig}
          tintColor='red'
          leftButton={leftButtonConfig} />
        <View style={styles.container}>
          <Text style={styles.summary}>{I18n.t('Subview.subview')} {I18n.t('App.version')}: {this.props.deviceVersion}
          </Text>
        </View>
      </View>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Subview)
