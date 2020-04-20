/**
 * Stack navigation for login.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {createStackNavigator} from 'react-navigation'
import LogInScreen from '../Auth/LogIn'
import Code from '../Auth/Code'
import Password from '../Auth/Password'
import ResetPassword from '../Auth/ResetPassword'
import TwoFactor from '../Auth/TwoFactor'
import IndexScreen from '../Auth/index'
import WalkThru from '../Auth/WalkThru'
import {Subscribe} from 'unstated'
import {AuthContainer} from '../state/authStateProvider'


// Creating a stack navigation component where are IndexScreen, Code, Password, ResetPassword, WalkThru, TwoFactor and LogInScreen.

const AuthStack = createStackNavigator(
  {
    AuthRoot: IndexScreen,
    Code,
    Password,
    ResetPassword,
    WalkThru,
    TwoFactor,
    LogIn: LogInScreen,
  },
  {
    initialRouteName: 'AuthRoot',
    headerMode: 'none',
  }
)

export default class authStackWithStore extends Component {
  static router = AuthStack.router
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  // Pass the Unstated Container to React Navigation
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {(auth) => (
          <AuthStack
            navigation={this.props.navigation}
            screenProps={{auth}}
          />
        )}
      </Subscribe>
    )
  }
}
