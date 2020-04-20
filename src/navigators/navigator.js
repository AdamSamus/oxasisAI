/**
 * Main navigation component.
 */
import {createSwitchNavigator} from 'react-navigation'
import {AppStack} from './drawerStack'
import AuthStack from './authStack'
import AuthLoadingScreen from '../Auth/AuthLoadingScreen'

export default createSwitchNavigator(
/**
 * The component is a switch navigations which has 3 components.(switch navigation couldn't have navigation stack so it won't push or pop or go back.)
 * AuthLoadingScreen is a progressing component while login.
 * AuthStack is a stack navigation which is operated while in login, logout, resetting password and something else for customer authentication.
 * AppStack is a stack navigation for engine components after login.
 *
 */
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)
