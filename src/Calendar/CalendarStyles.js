import {Spacing, Containers, Headers, Icons, Buttons, Typography, Forms, Colors} from '../styles'
import {StyleSheet} from 'react-native'
import { containerExpandCenter } from '../styles/components/containers';

const calendarStyles = {
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  container: {
    ...Containers.containerExpand,
  },
  containerHorizontal: {
    ...Containers.containerHorizontal,
  },
  // CONTENT
  h1: {
    ...Headers.h1,
  },
  h6: {
    ...Headers.h6,
  },
  copy: {
    ...Typography.bodyCopyLarge,
    marginBottom: Spacing.globalMarginLarger,
    textAlign: 'center',
  },
  // EVENTS
  event: {
    backgroundColor: Colors.lighterGray,
    padding: Spacing.globalPadding,
    paddingBottom: 0,
    marginBottom: Spacing.globalMarginSmall,
  },
  eventDescription: {
    flexDirection: 'column',
    minHeight: 50,
  },
  eventDescriptionCopy: {
    ...Typography.bodyCopy,
    paddingVertical: Spacing.globalPaddingSmall,
  },
  eventLinks: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    flexDirection: 'row',
    marginTop: Spacing.globalMarginSmall,
  },
  iconLink: {
    ...Typography.iconLink,
    paddingVertical: Spacing.globalPadding,
    paddingRight: Spacing.globalPadding,
  },
  iconLinkIcon: {
    ...Icons.small,
    ...Typography.iconLinkIcon,
    color: Colors.oxasisBlue,
  },
  iconLinkText: {
    ...Typography.iconLinkText,
  },
  // BUTTONS
  disabled: {
    ...Buttons.primary,
    backgroundColor: Colors.lighterGray,
  },
  fixedButtonGroup: {
    backgroundColor: Colors.white,
    height: 90,
    padding: Spacing.globalPadding,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -0.25 },
    shadowOpacity: 0.4,
  },
  fixedButtonGroupContainer: {
    ...Buttons.container,
    margin: 0,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonGroupContainer: {
    ...Buttons.container,
    flex: 1,
    marginHorizontal: Spacing.globalPadding,
  },
  buttonGroupContainerLeft: {
    ...Buttons.container,
    flex: 1,
    marginRight: Spacing.globalPadding,
  },
  buttonGroupContainerRight: {
    ...Buttons.container,
    flex: 1,
    marginLeft: Spacing.globalPadding,
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
  //FORMS
  eventForm: {
    marginBottom: Spacing.globalMarginLarge,
  },
  inputContainer: {
    ...Forms.stackedInputWrapper,
  },
  label: {
    ...Forms.label,
  },
  input: {
    ...Forms.input,
  },
  inputRowWrapper: {
    ...Forms.inputRowWrapper,
  },
  firstInputRowWrapper: {
    ...Forms.firstInputRowWrapper,
    // the toggle doesn't get as much breathing room
    paddingVertical: Spacing.globalMarginSmall,
  },
  placeholder: {
    ...Forms.label,
  }
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...calendarStyles, ...overrides})
}

export default {
  createStyles,
}
