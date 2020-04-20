import {Colors, Spacing, Fonts, Headers} from '..'

export default {
  // TABLE
  tableWrapper: {
    backgroundColor: Colors.white,
    borderColor: Colors.oxasisBlue,
    borderWidth: 1,
    marginTop: Spacing.globalMargin,
  },
  tableWrapperHeaders: {
    backgroundColor: Colors.oxasisBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.globalPaddingSmall,
  },
  tableWrapperHeader: {
    color: Colors.white,
    fontFamily: Fonts.bodyFontBold,
    fontSize: Headers.h5Size,
  },
  tableContainer: {
    borderColor: Colors.dividerColor,
    borderWidth: 1,
  },
  tableHeader: {
    backgroundColor: Colors.lighterGray,
    flex: 1,
    flexDirection: 'row',
    padding: Spacing.globalPaddingSmall,
  },
  tableRow: {
    borderTopColor: Colors.lightGray,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: 'row',
    //padding: Spacing.globalPaddingSmall,
  },
  tableAverage: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      textAlign: "center",
      alignItems: 'center',
      backgroundColor: Colors.lighterGray
  },


  tableTextFirst: {
    flex: 1.5,
  },
  tableText: {
    textAlign: "center",
    flex: 1,
  },
  textRight: {
    textAlign: 'right',
  },
}
