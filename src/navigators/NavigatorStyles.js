//NavigatorStyles
import {Colors} from '../styles'

import {StyleSheet} from 'react-native'

const NavigatorStyles = {
  tabBarOptionActive: {
    // borderTopColor: Colors.navigationActiveAccent,
    // borderTopWidth: 4,
    // or
    // backgroundColor: Colors.navigationActiveAccent,
    // paddingTop: 4,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...NavigatorStyles, ...overrides})
}
export default {
  createStyles,
}
