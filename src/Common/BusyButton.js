// Busy Button for the forms
import React from 'react'
import PropTypes from 'prop-types'
import {Text, TouchableHighlight} from 'react-native'
import LoginStyles from '../Auth/LogInStyles'

const loginStyles = LoginStyles.createStyles()

function BusyButtonIndicator() {
  return <Text style={loginStyles.buttonText}>Submitting...</Text>
}

export default function BusyButton({ // eslint-disable-line complexity
  children,
  isBusy,
  busyContent,
  onPress,
  ...touchableProps
}) {
  return (
    <TouchableHighlight {...touchableProps} onPress={isBusy ? null : onPress}>
      {isBusy ? busyContent || <BusyButtonIndicator /> : children}
    </TouchableHighlight>
  )
}

BusyButton.propTypes = {
  children: PropTypes.node,
  isBusy: PropTypes.bool,
  busyContent: PropTypes.node,
  onPress: PropTypes.func,
}