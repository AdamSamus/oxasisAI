import React, {Component} from 'react'
import PropTypes from 'prop-types'

import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {AuthContainer} from '../state/authStateProvider'
import {NotificationContainer} from '../state/notificationStateProvider'
import {Notifications} from 'expo';
import {Subscribe} from 'unstated'
import {activeRouteKey} from '../helpers/nav'
import { HomeInfoContainer } from '../state/homeInfoProvider'

class NotificationHandler extends Component {
  static propTypes = {
    activityStore: PropTypes.object,
    currentUser: PropTypes.object,
    navigation: PropTypes.object,
    notificationStore: PropTypes.object,
  }

  componentDidMount() {
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  componentWillUnmount() {
    if (this.notificationSubscription) {
      this.notificationSubscription.remove();
    }
  }

  handleNotification = (notification) => {
    const {currentUser, notificationStore} = this.props
    const {data, origin} = notification

    notificationStore.fetchNotifications(currentUser)

    // 'selected' means the user clicked the notification.
    // the handler will also be invoked with an origin of 'received'
    // if a notification hits while the app is foregrounded, but we ignore those
    if (origin === 'selected') {
      this.handleNotificationNav(data)
    }
  }

  // eslint-disable-next-line complexity
  async handleNotificationNav(data) {
    const {activityStore, currentUser, navigation} = this.props

    if (data.Type === 100 || data.Type === '100') {
      navigation.navigate('Faq')
      return
    }

    if (data.SensorID) {
      await activityStore.filterBySensor(currentUser, data.SensorID)
      await activityStore.setView('List')
      // changed to redirect the deeplink to Overview instead of Activities
      //navigation.navigate('Activities')
      //if (activeRouteKey(navigation.state) === 'Activities') {
      if (activeRouteKey(navigation.state) === 'Overview') {
        // nav event won't fire to trigger data refresh, so we manually fetch
        activityStore.fetchSensorEvents(currentUser)
      }
      // changed to redirect the deeplink to Overview instead of Activities
      //navigation.navigate('Activities')
      navigation.navigate('Overview')
      return
    }

    navigation.openNotificationDrawer('Notifications')
  }

  render() {
    return null
  }
}

const ConnectedNotificationHandler = (props) => {
  return (
    <Subscribe to={[ActivitiesContainer, AuthContainer, NotificationContainer, HomeInfoContainer]}>
      {(activityStore, authStore, notificationStore, homeStore) => (
        <NotificationHandler
          {...props}
          activityStore={activityStore}
          currentUser={authStore.currentUser}
          notificationStore={notificationStore}
          homeStore={homeStore}
        />
      )}
    </Subscribe>
  )
}

export default ConnectedNotificationHandler
