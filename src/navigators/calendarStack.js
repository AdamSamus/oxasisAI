import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import {Subscribe} from 'unstated'
import CalendarRoutes from '../Calendar/routes'
import {AuthContainer} from '../state/authStateProvider'
import {HomeInfoContainer} from '../state/homeInfoProvider'
import {ActivitiesContainer} from '../state/activitiesStateProvider'
import {OutOfHomeEventsContainer} from '../state/outOfHomeEventsProvider'
import {SharedHeader} from '../Common/SharedHeader'

const CalendarStack = createStackNavigator(
  {
    ...CalendarRoutes,
  },
  {
    initialRouteName: 'Calendar',
    navigationOptions: ({navigation}) => ({
      ...SharedHeader(navigation),
    }),
  }
)

export default class calendarStackWithStore extends Component {
  static router = CalendarStack.router
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Subscribe
        to={[
          AuthContainer,
          HomeInfoContainer,
          OutOfHomeEventsContainer,
          ActivitiesContainer
        ]}
      >
        {(authStore, homeInfoStore, outOfHomeStore, activityStore) => (
          <CalendarStack
            navigation={this.props.navigation}
            screenProps={{
              currentUser: authStore.currentUser,
              homeInfoStore,
              store: outOfHomeStore,
              activityStore
            }}
          />
        )}
      </Subscribe>
    )
  }
}
