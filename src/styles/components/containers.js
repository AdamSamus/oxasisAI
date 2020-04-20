import {Dimensions} from 'react-native'
export const fullHeight = Dimensions.get('window').width
export const fullWidth = Dimensions.get('window').width

import * as Colors from'../colors'
import * as Spacing from'../spacing'

export const pageWrapper = {
  backgroundColor: Colors.white,
  flex: 1,
  width: fullWidth,
};
export const base = {
  backgroundColor: Colors.white,
  paddingHorizontal: Spacing.globalPadding,
  paddingVertical: Spacing.globalPaddingLarge,
  width: fullWidth,
};
export const container = {
  ...base,
};
export const containerExpand = {
  ...base,
  flex: 1,
};
export const containerExpandCenter = {
  ...base,
  flex: 1,
  flexDirection: 'column',
  height: fullHeight,
  justifyContent: 'space-between',
};
export const containerHorizontal = {
  ...containerExpandCenter,
  flexDirection: 'row',
  justifyContent: 'space-around',
  padding: 10
}
