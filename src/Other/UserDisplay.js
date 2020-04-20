import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {parsePhoneNumberFromString} from 'libphonenumber-js'


import SettingsStyles from './SettingsStyles'

const styles = SettingsStyles.createStyles()
// suposing there is pending in user info
// eslint-disable-next-line complexity
export const UserDisplay = ({user, handleClickDelete}) => (
  <View style={styles.cardContainer}>
    <Text style={styles.h4}>{user.FirstName} {user.LastName}</Text>

    {user.EmailAddress &&
      <View style={styles.userRowWrapper}>
        <Text style={styles.userEmail}>{user.EmailAddress}</Text>
      </View>
    }

    {user.MobileNumber &&
      <View style={styles.userRowWrapper}>
        <Icon style={styles.icon} size={16} name="cellphone" />
        <Text>{parsePhoneNumberFromString(user.MobileNumber).formatNational()}</Text>
      </View>
    }

    {user.AddressOne &&
      <View style={styles.userRowWrapper}>
        <Icon style={styles.icon} size={16} name="home" />
        <Text>{user.AddressOne}</Text>
      </View>
    }
    {user.AddressTwo &&
      <View style={styles.userRowWrapper}>
        <Icon style={styles.iconSpacer} size={16} name="home" />
        <Text>{user.AddressTwo}</Text>
      </View>
    }
    {(user.City || user.State || user.ZipCode) &&
      <View style={styles.userRowWrapper}>
        <Icon style={styles.iconSpacer} size={16} name="home" />
        <Text>{user.City}, {user.State} {user.ZipCode}</Text>
        
      </View>
    }

    {handleClickDelete && (
      <View style={styles.cardLinks}>
        <TouchableHighlight
          onPress={() => handleClickDelete(user.ID)}
          underlayColor='transparent'
        >
          <View style={styles.iconLink}>
            <Icon size={styles.iconLinkIcon.width} style={styles.iconLinkIcon} name='close' />
            <Text style={styles.iconLinkText}>Remove User</Text>
            <Text style={{color: user.CodeRedeemedDate===null?'red':'green', marginLeft: 10}}>{user.CodeRedeemedDate===null?'Pending':'Accepted'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )}
  </View>
)

UserDisplay.propTypes = {
  user: PropTypes.object,
  handleClickDelete: PropTypes.func,
}
