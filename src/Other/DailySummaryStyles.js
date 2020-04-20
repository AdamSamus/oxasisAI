import {Containers, Headers, Typography, Spacing, Colors} from '../styles'
import tableStyles from '../styles/components/tables'
import {StyleSheet} from 'react-native'

const dailySummaryStyles = {
  // LAYOUT
  pageWrapper: {
    ...Containers.pageWrapper,
  },
  containerExpand: {
    ...Containers.containerExpand,
  },

  // LINKS AND TYPOGRAPHY
  h1: {
    ...Headers.h1,
    marginBottom: Spacing.globalMarginTiny,
  },
  h4: {
    ...Headers.h4,
    textAlign: 'center',
    marginBottom: Spacing.globalMargin,
  },
  h6: {
    ...Headers.h6,
    flex: 2,
  },
  bodyText: {
    ...Typography.bodyCopy,
    marginTop: Spacing.globalMargin,
  },
  linkText: {
    color: Colors.oxasisBlue,
  },
  ...tableStyles,
  textRight: {
    textAlign: 'right',
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...dailySummaryStyles, ...overrides})
}

export default {
  createStyles,
}
