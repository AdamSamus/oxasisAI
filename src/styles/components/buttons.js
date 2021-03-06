import {Dimensions} from 'react-native'
const fullWidth = Dimensions.get('window').width

import * as Colors from'../colors'
import * as Fonts from'../fonts'
import * as Spacing from'../spacing'

// BUTTONS
export const container = {
  flexDirection: 'row',
  marginBottom: Spacing.globalMarginLarge,
};
export const base = {
  flex: 1,
  height: 60,
  justifyContent: 'center',
};
export const baseText = {
  color: Colors.bodyColor,
  fontFamily: Fonts.bodyFont,
  fontSize: Fonts.bodyFontSize,
  textAlign: 'center',
};
//button sizes
export const small = {
  height: 40,
};
export const narrow = {
  width: 200,
};
//button types
export const primary = {
  ...base,
  backgroundColor: Colors.buttonPrimaryBkgd,
};
export const primaryText = {
  ...baseText,
};

export const secondary = {
  ...base,
  backgroundColor: Colors.buttonSecondaryBkgd,
  borderColor: Colors.lightGray,
  borderStyle: 'solid',
  borderWidth: 1,
};
export const secondaryText = {
  ...baseText,
  color: Colors.bodyColor,
};

export const disabled = {
  ...base,
  backgroundColor: 'transparent',
};
export const disabledText = {
  ...baseText,
};
