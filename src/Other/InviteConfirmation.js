import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native'

import {Typography} from '../styles'
import LoginStyles from '../Auth/LogInStyles'

const loginStyles = LoginStyles.createStyles()

export default class InviteConfirmation extends Component {

  render() {
    return (
      <ScrollView style={loginStyles.pageWrapper}>
        <View style={loginStyles.containerExpand}>
          <View>
            <Text style={loginStyles.h1}>Invitation Sent!</Text>
            <Text style={{
                fontSize: Typography.bodyFontSize,
                lineHeight: Typography.bodyLineHeight,
            }}>
              We will email the new user with instructions about getting started.
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}
