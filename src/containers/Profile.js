'use strict';

/**
 * The components needed from React
 */
import React, {Component} from 'react'
import { StyleSheet, View, Text} from 'react-native'
var Mailer = require('NativeModules').RNMail;


/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')


var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  comingSoon: {
    textAlign: 'center',
    fontSize: 20,
  },
  subText: {
    textAlign: 'center',
  }
})

/**
 * ## App class
 */
class Profile extends Component {
  constructor(props) {
    super(props);
    this._handleHelp = this._handleHelp.bind(this);
  }

  componentWillMount() {
  }

  _handleHelp() {
    Mailer.mail({
      subject: 'Greetings',
      recipients: ['hi2@nexcast.co'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: 'test',
      isHTML: true, // iOS only, exclude if false
    }, (error, event) => {
      if(error) {
        console.log('Mailer Err: (Profile.js)', error);
      }
    });
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.comingSoon}>More features coming soon!</Text>

        <View style={{width: 200, marginTop: 20}}>
          <Text style={styles.subText}>Hit SEND FEEDBACK above to suggest features</Text>
        </View>
      </View>


    )
  }
}

export default Profile
