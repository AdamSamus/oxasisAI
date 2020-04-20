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
  title: {
    marginTop: Spacing.globalMargin,
    marginBottom: Spacing.globalMarginSmall,
    fontSize: 30,
    color: Colors.oxasisGold,
    fontWeight: 'bold',
    textAlign: 'right',

  },
  heroIcon: {
    ...Icons.large,
    borderColor: Colors.oxasisGold,
    borderRadius: 65,
    borderWidth: 2,
    color: Colors.oxasisGold,
    height: 130,
    lineHeight: 130,
    marginBottom: Spacing.globalMarginSmall,
    marginTop: Spacing.globalMargin,
    textAlign: 'center',
    width: 130,
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
