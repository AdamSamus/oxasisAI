import {Spacing, Colors, Containers, Headers, Buttons, Icons, Typography} from '../styles'
import {StyleSheet} from 'react-native'

const activityStyles = {
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  container: {
    ...Containers.containerExpand,
    paddingVertical: 0,
  },
  containerHorizontal: {
    ...Containers.containerHorizontal,
  },
  containerNoPadding: {
    ...Containers.containerExpand,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  // CONTENT
  h1: {
    ...Headers.h1,
  },
  h2: {
    ...Headers.h2,
  },
  content: {
    marginBottom: Spacing.globalMarginLarge,
    textAlign: 'center',
  },
  // BUTTONS
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGroupContainer: {
    ...Buttons.container,
    flex: 1,
  },
  button: {
    ...Buttons.primary,
  },
  buttonText: {
    ...Buttons.primaryText,
  },
  buttonSecondary: {
    ...Buttons.secondary,
  },
  buttonSecondaryText: {
    ...Buttons.secondaryText,
  },
  dateText: {
    fontSize: Typography.bodyFontSize,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  heroIcon: {
    ...Icons.large,
    borderColor: Colors.oxasisGold,
    color: Colors.oxGold,
    height: 150,
    width: 150,
    borderRadius: 75,
    borderWidth: 3,
    //lineHeight: 90,
    justifyContent: "center",
    marginBottom: Spacing.globalMarginSmall,
    marginTop: Spacing.globalMarginSmall,
    textAlign: 'center',
    //textAlignVertical: 'center',
    alignItems: 'center',
    alignSelf: 'center',


  },
  heroText: {
    ...Headers.h2,
    marginBottom: Spacing.globalMarginSmall,
  },
  icon: {
    ...Icons.base,
    color: Colors.oxasisBlue,
    marginRight: Spacing.globalMarginMedium,
  },
  link: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.globalPaddingLarge,
  },
  linkContent: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: Spacing.globalPadding,
  },
  text: {
    fontSize: Typography.bodyFontSize,
    lineHeight: Typography.bodyLineHeight,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...activityStyles, ...overrides})
}

export default {
  createStyles,
}
