import {Colors, Containers, Spacing, Fonts, Typography, Headers, Buttons, Forms} from '../styles'
import {StyleSheet, Dimensions} from 'react-native'
const fullHeight = Dimensions.get('window').height
const fullWidth = Dimensions.get('window').width

const LandingStyles = {
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  // BACKGROUND IMAGE STYLES
  signupBkgdContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: fullHeight,
  },
  signupBkgd: {
    width: fullWidth,
    height: fullHeight,
    position: 'absolute',
  },
  section: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    height: fullHeight,
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.globalPadding,
    width: fullWidth,
  },

  container: {
    backgroundColor: Colors.oxasisGrey,
    flex: 1,
    flexDirection: 'column',
    minHeight: fullHeight,
    paddingHorizontal: Spacing.globalPaddingLarge,
    paddingVertical: Spacing.globalPadding,
    width: fullWidth,
    resizeMode: 'cover', // or 'stretch'
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    paddingTop: Spacing.globalPadding,
  },
  logo: {
    maxHeight: 200,
    width: 300,
  },

  // CONTENT
  h1: {
    ...Headers.h1,
    color: Colors.headerColorLight,
    fontFamily: Fonts.bodyFontBold,
    marginBottom: Spacing.globalMargin,
  },
  contentContainer: {
    flex: 4,
    paddingHorizontal: Spacing.globalPadding,
  },
  content: {
    ...Typography.bodyCopy,
    color: Colors.white,
    paddingBottom: Spacing.globalPaddingLarge,
    textAlign: 'center',
  },

  // BUTTONS
  buttonContainer: {
    ...Buttons.container,
    paddingHorizontal: Spacing.globalPaddingLarger,
  },
  button: {
    ...Buttons.primary,
  },
  buttonText: {
    ...Buttons.primaryText,
  },
  buttonSecondary: {
    ...Buttons.secondary,
    borderColor: Colors.white,
  },
  buttonSecondaryText: {
    ...Buttons.secondaryText,
    color: Colors.white,
  },
  //FORMS
  label: {
    ...Forms.label,
  }
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...LandingStyles, ...overrides})
}

export default {
  createStyles,
}
