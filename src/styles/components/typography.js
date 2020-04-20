import * as Colors from '../colors'
import * as Fonts from '../fonts'
import * as Spacing from '../spacing'
import {containerExpandCenter} from './containers';

export const bodyFontSize = 16
export const bodyFontSizeLarge = 18
export const bodyFontSizeSmall = 12
export const bodyFontSizeTiny = 8

export const bodyLineHeight = 28
export const bodyLineHeightLarge = 30
export const bodyLineHeightSmall = 20

export const iconFontSize = 18

export const bodyCopy = {
  fontSize: bodyFontSize,
  lineHeight: bodyLineHeight,
};
export const bodyCopy2 = {
  fontSize: bodyFontSize,
  lineHeight: bodyLineHeight,
  marginBottom: Spacing.globalMargin,
  marginTop: Spacing.globalMargin,
};
export const bodyCopyLarge = {
  fontSize: bodyFontSizeLarge,
  lineHeight: bodyLineHeightLarge,
};
export const bodyCopyLargeBold = {
  fontSize: bodyFontSizeLarge,
  lineHeight: bodyLineHeightLarge,
};
export const bodyCopySmall = {
  fontSize: bodyFontSizeSmall,
  lineHeight: bodyLineHeightSmall,
};
export const helpText = {
  color: Colors.gray,
  fontFamily: Fonts.bodyFont,
  fontSize: bodyFontSizeSmall,
  marginBottom: Spacing.globalMarginLarge,
};
export const textLink = {
  alignItems: containerExpandCenter,
}
export const iconLink = {
  alignItems: 'center',
  color: Colors.oxasisBlue,
  flexDirection: 'row',
  flexWrap: 'nowrap',
}
export const iconLinkIcon = {
  color: Colors.oxasisBlue,
  marginRight: Spacing.globalMarginTiny,
}
export const iconLinkText = {
  color: Colors.oxasisBlue,
}
