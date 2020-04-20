import * as Colors from'../colors'

export default {
  inputIOS: {
        fontSize: 17,
        paddingTop: 13,
        paddingHorizontal: 10,
        paddingBottom: 12,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: Colors.oxasisGold,
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
  },
  inputIOSX: {
          color: 'black',
          marginTop: 5,
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderWidth: 1,
          borderColor: Colors.lightGray,
          borderRadius: 4,
          paddingRight: 30, // to ensure the text is never behind the icon
    },
  inputAndroid: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: Colors.lightGray,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}
