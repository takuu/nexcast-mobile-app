import React, {Component} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Ion from 'react-native-vector-icons/Ionicons'


class TabIcon extends Component {
  render () {
    if(this.props.selected) {
      color = '#387ef5';
      iconName = this.props.iconName;
    } else {
      if(this.props.iconName == 'logo-buffer') {
        color = '#888888';
        iconName = this.props.iconName;
      } else {
        color = '#888888';
        iconName = this.props.iconName + '-outline';
      }

    }
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Ion style={{color: color}} name={iconName} size={32} />
        <Text style={{color: color, fontSize: 10}}>{this.props.title}</Text>
      </View>
    )
  }
}

export default TabIcon;
