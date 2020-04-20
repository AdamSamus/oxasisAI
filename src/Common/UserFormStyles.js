import {Colors, Forms} from '../styles'
import PickerStyles from '../styles/components/pickerSelect'
import {StyleSheet} from 'react-native'

const UserFormStyles = {
  inputContainer: {
    ...Forms.stackedInputWrapper,
  },
  label: {
    ...Forms.label,
  },
  input: {
    ...Forms.inputMinimal,
  },
  phoneInput: {
    fontSize: 16,
    marginTop: 5,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    color: 'black',
  },
}

function createStyles(overrides = {}) {
  return StyleSheet.create({...UserFormStyles, ...PickerStyles, ...overrides})
}

export default {
  createStyles,
}
