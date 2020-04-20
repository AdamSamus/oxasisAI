import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
} from 'react-native'
import { parsePhoneNumberFromString } from 'libphonenumber-js'


import SettingsStyles from './SettingsStyles'

const styles = SettingsStyles.createStyles()

export const UserProfileDisplay = ({ user }) => (
  <View>
    <View style={styles.rowContainer}>
      <Text style={styles.bodyText}>{user.FirstName} {user.LastName}</Text>
    </View>

    <View style={styles.rowContainer}>
      {user.EmailAddress && <Text style={styles.bodyText}>{user.EmailAddress}</Text>}
    </View>

    {user.MobileNumber &&
      <View style={styles.rowContainer}>
        <Text style={styles.bodyText}>{parsePhoneNumberFromString(user.MobileNumber).formatNational()}</Text>
      </View>
    }

    {user.AddressOne &&
      <View>
         <Text style={styles.bodyText}>{user.AddressOne}, {user.AddressTwo}{"\r"}</Text>
          <Text style={styles.bodyText}>{user.City}, {user.State} {user.ZipCode}{"\r"}</Text>
      </View>
    }

  </View>
)

UserProfileDisplay.propTypes = {
  user: PropTypes.object,
}
