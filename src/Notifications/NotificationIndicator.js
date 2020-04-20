import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {View, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {Subscribe} from 'unstated'
import {NotificationContainer} from '../state/notificationStateProvider'
import topBarStyles from '../styles/components/topBarStyles';

const topBar = topBarStyles.createStyles()

class NotificationIndicator extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    notificationStore: PropTypes.object,
  }

  get notificationCount() {
    return this.props.notificationStore.notifications.length
  }

  handleIconClick = () => {
    this.props.navigation.openNotificationDrawer()
  }

  render() {
    const notificationCount = this.notificationCount

    return (
      <TouchableHighlight
        onPress={this.handleIconClick}
        underlayColor="rgba(0, 0, 0, 0)"
      >
        <View style={topBar.notification}>
          <Icon name="notifications" size={30} style={topBar.notificationIcon} />
          {notificationCount > 0 && (
            <View style={topBar.badge}>
              <Text style={topBar.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      </TouchableHighlight>
    )
  }
}

const ConnectedNotificationIndicator = (props) => {
  return (
    <Subscribe to={[NotificationContainer]}>
      {(notificationStore) => (
        <NotificationIndicator
          {...props}
          notificationStore={notificationStore}
        />
      )}
    </Subscribe>
  )
}

export default ConnectedNotificationIndicator
