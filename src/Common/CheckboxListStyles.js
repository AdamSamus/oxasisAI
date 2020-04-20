import {StyleSheet} from 'react-native'
import {Spacing, Icons, Typography} from '../styles'
import {Dimensions} from 'react-native'
export const fullWidth = Dimensions.get('window').width

const checkboxListStyles = {
  checkboxList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Spacing.globalMargin,
  },
  checkboxRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: Spacing.globalPaddingTiny,
    width: fullWidth / 2 - Spacing.globalPadding,
  },
  checkboxIcon: {
    ...Icons.base,
    height: Typography.bodyCopy.lineHeight,
    marginRight: Spacing.globalPaddingSmall,
    width: Typography.bodyCopy.lineHeight,
  },
  checkboxLabel: {
    ...Typography.bodyCopy,
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...checkboxListStyles, ...overrides})
}

export default {
  createStyles,
}

