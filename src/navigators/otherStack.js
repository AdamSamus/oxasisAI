/**
 * Stack navigation component for Overview. OverviewRoutes is route for stack.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import MenuRoutes from '../Other/routes'
import {Subscribe} from 'unstated'
import {AuthContainer} from '../state/authStateProvider'
import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {NotificationContainer} from '../state/notificationStateProvider'
import {HomeInfoContainer} from '../state/homeInfoProvider'
import {SharedHeader} from '../Common/SharedHeader'

const MenuStack = createStackNavigator(
  {
    ...MenuRoutes,
  },
  {
    initialRouteName: 'Help',
    navigationOptions: ({navigation}) => ({
      ...SharedHeader(navigation),
    }),
  }
)

export default class menuStackWithStore extends Component {
  static router = MenuStack.router
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
        {(store, authStore, notificationStore, homeStore) => (
          <MenuStack
            navigation={this.props.navigation}
            screenProps={{
              store,
              auth: authStore,
              notificationStore,
              homeStore,
            }}
          />
        )}
      </Subscribe>
    )
  }
}
