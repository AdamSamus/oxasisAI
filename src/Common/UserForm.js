import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
} from 'react-native'
import {STATES} from '../helpers/states'
import RNPickerSelect from 'react-native-picker-select'
import PhoneInput from 'react-native-phone-input'

import {Colors} from '../styles'
import UserFormStyles from './UserFormStyles'
const styles = UserFormStyles.createStyles()

/**
 * A generic form for editing user info
 * props:
 *   - `onChange` will be passed an object like `{fieldName: newValue}` every time a field is updated
 *   - `user` is the current form, and should be updated in `onChange` to keep controlled inputs in sync
 */
class UserForm extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    user: PropTypes.object,
  }

  render() {
    const {onChange, user} = this.props

    return (
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(FirstName) => onChange({FirstName})}
            autoCapitalize="words"
            autoCompleteType="name"
            autoCorrect={false}
            value={user.FirstName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(LastName) => onChange({LastName})}
            autoCapitalize="words"
            autoCompleteType="name"
            autoCorrect={false}
            value={user.LastName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(EmailAddress) => onChange({EmailAddress})}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={user.EmailAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>

          <PhoneInput
            autoFormat
            style={styles.phoneInput}
            onChangePhoneNumber={(MobileNumber) => onChange({MobileNumber})}
            value={user.MobileNumber}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address 1</Text>
          <TextInput
            style={styles.input}
            placeholder="Address 1"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(AddressOne) => onChange({AddressOne})}
            autoCorrect={false}
            autoCompleteType="street-address"
            value={user.AddressOne}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address 2</Text>
          <TextInput
            style={styles.input}
            placeholder="Address 2"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(AddressTwo) => onChange({AddressTwo})}
            autoCorrect={false}
            value={user.AddressTwo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(City) => onChange({City})}
            autoCorrect={false}
            value={user.City}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State</Text>
          <RNPickerSelect
            placeholder={{label: 'Select a State...', value: null}}
            items={STATES}
            onValueChange={(value) => {
              onChange({
                State: value,
              });
            }}
            style={{inputIOS: styles.inputIOS, inputAndroid: styles.inputAndroid}}
            value={user.State}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Zip Code"
            placeholderTextColor={Colors.lightGray}
            onChangeText={(ZipCode) => onChange({ZipCode})}
            value={user.ZipCode}
          />
        </View>
      </View>
    )
  }
}

export default UserForm
