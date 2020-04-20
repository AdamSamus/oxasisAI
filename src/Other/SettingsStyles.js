import {Colors, Containers, Fonts, Forms, Headers, Icons, Spacing, Typography, Buttons} from '../styles'
import PickerStyles from '../styles/components/pickerSelect'
import {StyleSheet, Dimensions} from 'react-native'
const fullWidth = Dimensions.get('window').width

const settingsStyles = {
  // LAYOUT
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
  rowContainer: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.globalPaddingMedium,
  },
  profileContainer: {
    paddingVertical: Spacing.globalPaddingMedium,
  },

  drawer: {
    flex: 1,
    paddingTop: 40,
    width: fullWidth,
  },
  section: {
    borderTopColor: Colors.dividerColor,
    borderTopWidth: 1,
    marginTop: Spacing.globalPadding,
    paddingVertical: Spacing.globalPadding,
  },
  // LINKS AND TYPOGRAPHY
  link: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.globalPaddingLarge,
  },
  linkContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.globalPadding,
  },
  h1: {
    ...Headers.h1,
  },
  h3: {
    ...Headers.h3,
  },
  h4: {
    ...Headers.h4,
  },
  h5: {
    ...Headers.h5,
  },
  emphasized: {
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: Typography.bodyFontSize,
  },
  text: {
    fontSize: Typography.bodyFontSizeLarge,
  },
  sectionTitle: {
    ...Headers.h5,
    marginTop: Spacing.globalMargin,
  },
  userEmail: {
    color: Colors.gray,
    fontStyle: 'italic',
    marginBottom: Spacing.globalMarginTiny,
  },
  userRowWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: Spacing.globalPaddingTiny,
  },
  // CARDS
  cardContainer: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    paddingTop: Spacing.globalPaddingMedium,
  },
  cardLinks: {
    // borderTopColor: Colors.lightGray,
    // borderTopWidth: 1,
    flexDirection: 'row',
    // marginTop: Spacing.globalMarginSmall,
  },
  // FORMS
  buttonContainer: {
    paddingVertical: Spacing.globalPadding,
  },
  inputRowWrapper: {
    ...Forms.inputRowWrapper,
    borderBottomWidth: 0,
  },
  label: {
    ...Forms.label,
  },
  buttonPrimary: {
    ...Buttons.primary,
  },
  buttonPrimaryText: {
    ...Buttons.primaryText,
  },
  buttonSecondary: {
    ...Buttons.secondary,
  },
  buttonSecondaryText: {
    ...Buttons.secondaryText,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -Spacing.globalPadding,
  },
  buttonGroupContainer: {
    ...Buttons.container,
    flex: 1,
    marginHorizontal: Spacing.globalPadding,
    marginTop: Spacing.globalPaddingLarge,
  },
  // ICONS
  icon: {
    color: Colors.oxasis,
    marginRight: Spacing.globalMarginSmall,
  },
  iconSpacer: {
    color: 'transparent',
    marginRight: Spacing.globalMarginSmall,
  },
  // EXISTING
  existingAlert: {
    ...Forms.inputRowWrapper,
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  alertSummary: {
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: Spacing.globalPadding,
  },
  deleteContainer: {
  },
  delete: {
    color: Colors.deleteLinkColor,
  },
  // NEW
  newAlertRow: {
    ...Forms.inputRowWrapper,
    borderBottomWidth: 0,
  },
  inputIOS: {
    ...PickerStyles.inputIOS,
    borderWidth: 0,
    marginTop: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    paddingVertical: 0,
    textAlign: 'right',
  },

  inputAndroid: {
    ...PickerStyles.inputAndroid,
    borderWidth: 0,
    marginTop: 0,
    paddingHorizontal: 0,
    paddingRight: 0,
    paddingVertical: 0,
    height: 50,
    flex: 1,
    left: Spacing.globalPadding,
  },
  // HELPERS
  marginBottomTiny: {
    marginBottom: Spacing.globalMarginTiny,
  },
  // Remove User Icon
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
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...settingsStyles, ...overrides})
}

export default {
  createStyles,
}
