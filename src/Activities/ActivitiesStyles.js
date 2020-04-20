import {Spacing, Colors, Containers, Forms, Headers, Buttons, Icons, Typography} from '../styles'
import {StyleSheet} from 'react-native'

const cellHeight = 68
const cellWidth = 80
const dotDiameter = 14
const labelHeight = 35
const dotRadius = dotDiameter / 2

const activityStyles = {
  container: {
    ...Containers.containerExpand,
  },
  containerHorizontal: {
    ...Containers.containerHorizontal,
  },
  containerNoPadding: {
    ...Containers.containerExpand,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  containerNoHorizontalPadding: {
    ...Containers.containerExpand,
    paddingHorizontal: 0,
  },
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  // CONTENT
  h1: {
    ...Headers.h1,
  },
  h4: {
    ...Headers.h4,
    paddingBottom: Spacing.globalPadding,
    textAlign: 'center',
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
  dateText: {
    fontSize: Typography.bodyFontSize,
    lineHeight: Typography.bodyLineHeight,
    textAlign: 'right',
  },
  icon: {
    ...Icons.base,
    color: Colors.oxasisBlue,
    marginRight: Spacing.globalMarginMedium,
  },
  link: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
  },
  linkContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.globalPadding,
  },
  text: {
    fontSize: Typography.bodyFontSize,
    lineHeight: Typography.bodyLineHeight,
  },
  // FORMS
  inputRowWrapper: {
    ...Forms.inputRowWrapper,
  },
  firstInputRowWrapper: {
    ...Forms.firstInputRowWrapper,
  },
  placeholder: {
    ...Forms.label,
  },
  // FILTER DETAILS
  filterInfoContainer: {
    alignItems: 'center',
    backgroundColor: Colors.lighterGray,
    flexDirection: 'row',
    paddingVertical: Spacing.globalPaddingSmall,
    paddingHorizontal: Spacing.globalPaddingSmall,
  },
  filterIcon: {
    ...Icons.base,
    height: 40,
    width: 40,
  },
  filterText: {
    color: Colors.oxasisBlue,
    flex: 1,
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.globalPaddingSmall,
  },
  checkboxListRow: {
    ...Forms.checkboxListRow,
  },
  // GRAPH
  graphContainer: {
    alignItems: 'stretch',
    flexDirection: 'row',
    flex: 1,
    position: 'relative',
    minHeight: '50%',
  },
  dataContainer: {
    backgroundColor: Colors.lightestGray,
    flex: 1,
    flexDirection: 'column',
  },
  // TIMES
  timeRow: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  timeCol: {
    borderLeftColor: Colors.dividerColor,
    borderLeftWidth: 1,
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    height: labelHeight,
    width: cellWidth,
  },
  graphLabel: {
    color: Colors.gray,
    fontSize: Typography.bodyFontSizeSmall,
    paddingLeft: Spacing.globalPaddingTiny,
  },
  // ICON LABELS
  graphLabels: {
    borderRightColor: Colors.dividerColor,
    borderRightWidth: 1,
    marginTop: labelHeight,
  },
  graphRowLabel: {
    alignItems: 'center',
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    height: cellHeight,
    justifyContent: 'center',
    width: 60,
  },
  graphIcon: {
    color: Colors.oxasisBlue,
  },
  graphRow: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    height: cellHeight,
  },
  graphColRule: {
    borderLeftColor: Colors.dividerColor,
    borderLeftWidth: 1,
    bottom: 0,
    left: -1,
    position: 'absolute',
    top: labelHeight,
    width: 1,
  },
  sleepTimeBlock: {
    backgroundColor: Colors.lightGray,
    bottom: 0,
    position: 'absolute',
    top: labelHeight,
  },
  // STATUSES AKA THE DOT
  statusOn: {
    backgroundColor: Colors.oxasisBlue,
    borderRadius: dotRadius,
    height: dotDiameter,
    minWidth: dotDiameter,
    position: 'absolute',
    top: (cellHeight - dotDiameter) / 2,
    width: dotDiameter,
  },
  // TABS
  segmentedControlTab: {
    marginHorizontal: Spacing.globalPadding,
    marginTop: Spacing.globalPaddingSmall,
  },
  tabsContainerStyle: {
    backgroundColor: Colors.lightestGray,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    padding: Spacing.globalPadding,
  },
  tabStyle: {
    backgroundColor: Colors.white,
    borderColor: Colors.oxasisBlue,
  },
  tabTextStyle: {
    color: Colors.oxasisBlue,
  },
  activeTabStyle: {
    backgroundColor: Colors.oxasisBlue,
    borderColor: Colors.oxasisBlue,
  },
  activeTabTextStyle: {
    color: Colors.white,
  },

  // FILTER LINK
  filterLink: {
    padding: Spacing.globalPaddingSmall,
  },
  filterLinkText: {
    ...Typography.bodyCopyLarge,
    color: '#F0AD00'
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...activityStyles, ...overrides})
}

export default {
  createStyles,
}

export {
  cellHeight,
  cellWidth,
  dotDiameter,
  dotRadius,
}
