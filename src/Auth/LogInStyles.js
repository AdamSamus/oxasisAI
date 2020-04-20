import {Colors, Fonts, Spacing, Containers, Headers, Typography, Buttons, Forms, Icons} from '../styles'
import PickerStyles from '../styles/components/pickerSelect'
import {StyleSheet} from 'react-native'


const LoginStyles = {
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  container: {
    ...Containers.container,
  },
  containerExpand: {
    ...Containers.containerExpand,
  },
  containerHorizontal: {
    ...Containers.containerHorizontal,
  },
  logoContainer: {
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    height: 100,
    paddingTop: 40,
  },
  logo: {
    height: 50,
    marginLeft: Spacing.globalMargin,
    width: 120,
  },
  // CONTENT
  h1: {
    ...Headers.h1,
  },
  content: {
    marginBottom: Spacing.globalMarginLarge,
    textAlign: 'center',
  },
  // BUTTONS
  buttonContainer: {
    ...Buttons.container,
  },
  button: {
    ...Buttons.primary,
    ...Buttons.narrow,
  },
  buttonText: {
    ...Buttons.primaryText,
  },
  // FORMS
  inputContainer: {
    ...Forms.stackedInputWrapper,
  },
  label: {
    ...Forms.label,
  },
  input: {
    ...Forms.inputMinimal,
  },
  // NOT FORMS
  staticInputContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: Spacing.globalMarginLarge,
  },
  staticInputLabel: {
    ...Forms.label,
    paddingRight: Spacing.globalPaddingSmall,
  },
  // FOOTER HELPTEXT
  helpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
  },
  helpText: {
    ...Typography.helpText,
  },
  helpTextLink: {
    ...Typography.helpText,
    color: Colors.black,
    fontFamily: Fonts.bodyFontBold,
    paddingLeft: Spacing.globalPaddingTiny,
  },
  phoneInput: {
    fontSize: 16,
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    color: 'black',
  },
  // WALKTHROUGH
  carouselOuter: {
    alignItems: 'center',
    flex: 1,
  },
  walkthroughTitle: {
    ...Headers.h2,
    marginTop: Spacing.globalMarginLarge,
  },
  walkthroughText: {
    color: Colors.gray,
    paddingHorizontal: Spacing.globalPaddingJumbo,
    marginBottom: Spacing.globalMargin,
    textAlign: 'center',
  },
  walkthroughImage: {
    height: '75%',
    width: undefined,
  },
  walkthroughProgress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.globalPaddingLarge,
    marginTop: Spacing.globalPadding + Spacing.globalPaddingLarge,
  },
  progressDot: {
    ...Icons.base,
    color: Colors.gray,
    marginHorizontal: Spacing.globalMarginSmall,
  },
  currentProgressDot: {
    ...Icons.base,
    color: Colors.oxasisGold,
    marginHorizontal: Spacing.globalMarginSmall,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...LoginStyles, ...PickerStyles, ...overrides})
}

export default {
  createStyles,
}
