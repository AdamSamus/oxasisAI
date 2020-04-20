/**
 * Stack navigation component for Activities tab.
 * Includes ActivitiesMain and ActivityFilter
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import ActivityRoutes from '../Activities/routes'
import ActivityFilter from '../Activities/ActivityFilter'
import {Subscribe} from 'unstated'
import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {AuthContainer} from '../state/authStateProvider'
import {HomeInfoContainer} from '../state/homeInfoProvider'
import {SharedHeader} from '../Common/SharedHeader'

const MainActivtiesStack = createStackNavigator(
  {
    ...ActivityRoutes,
  },
  {
    initialRouteName: 'Activities',
    navigationOptions: ({navigation}) => ({
      ...SharedHeader(navigation),
    }),
  }
)

const ActivtiesStack = createStackNavigator(
  {
    ActivitiesMain: MainActivtiesStack,
    ActivityFilter,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
)

export default class activityStackWithStore extends Component {
  static router = ActivtiesStack.router
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Subscribe
        to={[
          ActivitiesContainer,
          AuthContainer,
          HomeInfoContainer
        ]}
      >
        {(activityStore, authStore, homeInfoStore) => (
          <ActivtiesStack
            navigation={this.props.navigation}
            screenProps={{
              store: activityStore,
              currentUser: authStore.currentUser,
              homeInfoStore
            }}
          />
        )}
      </Subscribe>
    )
  }
}
