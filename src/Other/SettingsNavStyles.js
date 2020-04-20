import {Colors, Icons, Spacing, Typography} from '../styles'
import {StyleSheet, Dimensions} from 'react-native'
const fullWidth = Dimensions.get('window').width

const settingsNav = {
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: Spacing.globalPaddingLarge,
    width: fullWidth,
  },
  link: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.globalPaddingLarge,
  },
  linkContent: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Spacing.globalPaddingMedium,
  },
  text: {
    fontSize: Typography.bodyFontSizeLarge,
  },
  icon: {
    ...Icons.base,
    color: Colors.oxasisBlue,
    marginRight: Spacing.globalMarginMedium,
  },
}
function createStyles(overrides = {}) {
  return StyleSheet.create({...settingsNav, ...overrides})
}

export default {
  createStyles,
}