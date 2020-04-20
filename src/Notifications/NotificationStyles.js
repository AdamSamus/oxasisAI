import {Spacing, Colors, Containers, Headers, Icons, Typography, Fonts} from '../styles'
import {Dimensions, StyleSheet} from 'react-native'
export const fullWidth = Dimensions.get('window').width

const notificationStyles = {
  container: {
    ...Containers.containerExpand,
    paddingHorizontal: 0,
    width: 'auto',
  },
  content: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
  },
  // CONTENT
  h2: {
    ...Headers.h2,
    fontFamily: Fonts.bodyFontBold,
    marginBottom: Spacing.globalPaddingSmall,
    paddingTop: Spacing.globalPaddingMedium,
  },
  link: {
    ...Typography.bodyCopySmall,
    color: Colors.oxasisBlue,
  },
  note: {
    ...Typography.bodyCopy,
    paddingVertical: Spacing.globalPaddingLarge,
    textAlign: 'center',
  },
  notificationItem: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: Spacing.globalPadding,
    paddingHorizontal: Spacing.globalPadding,
  },
  icon: {
    ...Icons.base,
    marginRight: Spacing.globalPadding,
  },
  iconArrow: {
    color: Colors.oxasisGold,
    marginRight: 0,
  },
  dismissWrapper: {
    backgroundColor: Colors.deleteLinkColor,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  dismissText: {
    color: Colors.white,
    paddingHorizontal: Spacing.globalPadding,
  },
  details: {
    flexGrow: 1,
    paddingRight: Spacing.globalPadding,
    width: 150,
  },
  bodyWrapper: {
    flexWrap: 'wrap',
  },
  body: {
    ...Typography.bodyCopySmall,
  },
  smallPrint: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    ...Typography.bodyCopySmall,
    color: Colors.oxasisBlue,
  },

  // Alert STYLES
  alertContainer: {
    alignItems: 'center',
    backgroundColor: Colors.deleteLinkColor,
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: Spacing.globalPaddingSmall,
    width: fullWidth,
  },
  alertIcon: {
    color: Colors.white,
    marginRight: Spacing.globalMarginSmall,
  },
  alertText: {
    ...Typography.bodyCopySmall,
    color: Colors.white,
    flex: 1,
  },

  // Dismiss All STYLES
  dismissAllLink: {
    alignSelf: 'flex-end',
    padding: Spacing.globalPaddingSmall,
  },
  dimissAllText: {
    ...Typography.iconLinkText,
    fontSize: Typography.bodyFontSize,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...notificationStyles, ...overrides})
}

export default {
  createStyles,
}
