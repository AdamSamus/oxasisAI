import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import {Subscribe} from 'unstated'
import OverviewRoutes from '../Overview/routes'
import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {AuthContainer} from '../state/authStateProvider'
import {NotificationContainer} from '../state/notificationStateProvider'
import {HomeInfoContainer} from '../state/homeInfoProvider'
import {SharedHeader} from '../Common/SharedHeader'
/*
validated
*/

const OverviewStack = createStackNavigator(
  {
    ...OverviewRoutes,
  },
  {
    initialRouteName: 'Overview',
    navigationOptions: ({navigation}) => ({
      ...SharedHeader(navigation),
    }),
  }
)

export default class overviewStackWithStore extends Component {
  static router = OverviewStack.router
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Subscribe
        to={[
          ActivitiesContainer,
          AuthContainer,
          NotificationContainer,
          HomeInfoContainer,
        ]}
      >
        {(activityStore, authStore, notificationStore, homeStore) => (
          <OverviewStack
            navigation={this.props.navigation}
            screenProps={{
                notificationStore,
                activateNotifications: notificationStore.activateNotifications,
                store: activityStore,
                homeStore,
              currentUser: authStore.currentUser,
            }}
          />
        )}
      </Subscribe>
    )
  }
}
