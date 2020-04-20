import {Alert} from 'react-native'

export function requiredFields(fields, formattedFields, state) {
  return fields.every((fieldName, index) => {
    if (state[fieldName] === '') {
      Alert.alert('There was an error', `${formattedFields[index]} is a required field`)
      return false
    } else {
      return true
    }
  })
}

export function busyModal() {

}