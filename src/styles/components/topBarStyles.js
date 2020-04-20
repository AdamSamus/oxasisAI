import {StyleSheet} from 'react-native'
import * as Colors from'../colors'
import * as Spacing from'../spacing'
import * as Icons from'../components/icons'

const topBarStyles = {
  logoWrapper: {
    flexGrow: 1,
    alignItems: 'center',
  },
  logo: {
    height: 50,
    width: 120,
  },
  notification: {
    paddingHorizontal: Spacing.globalPadding,
  },
  notificationIcon: {
    ... Icons.base,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    color: Colors.white,
    height: 25,
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    right: Spacing.globalPaddingSmall,
    top: -5,
    width: 25,
  },
  badgeText: {
    color: Colors.white,
    lineHeight: 25,
    textAlign: 'center',
    width: 25,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...topBarStyles, ...overrides})
}

export default {
  createStyles,
}
