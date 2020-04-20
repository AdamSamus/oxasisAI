import {Colors, Spacing, Containers, Headers, Typography, Buttons, Forms} from '../styles'
import {StyleSheet, Dimensions} from 'react-native'

const tabNavigator = {
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    left: 0,
    position: 'absolute',
    justifyContent: 'center',
    right: 0,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: Colors.navigationActiveAccent,
    height: 4, 
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  icon: {
    color: Colors.oxasisBlue,
    paddingVertical: 10,

  },
}
function createStyles(overrides = {}) {
  return StyleSheet.create({...tabNavigator, ...overrides})
}

export default {
  createStyles,
}