import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ActivityIndicator, StatusBar, View, AsyncStorage} from 'react-native'
import {Subscribe} from 'unstated'
import {AuthContainer} from '../state/authStateProvider'

class AuthStore extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  /* eslint-disable complexity */
  _bootstrapAsync = async() => {
    const [userToken, email, id] = await AsyncStorage.multiGet(['token', 'email', 'id'])
    const {navigation: {navigate},auth: {getCurrentUser, validateUser},} = this.props

    if (userToken[1] && email[1] && id[1]) {
      await validateUser(userToken[1], email[1], id[1])

      const user = await getCurrentUser()

      /*if (user && user.verified === true) {*/
        if (user) {
        navigate('App')
        return;
      }
    }else {navigate('Auth')}

  }
  /* eslint-enable complexity */

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

export default class AuthLoadingScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  // Render any loading content that you like here
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {(auth) => <AuthStore auth={auth} navigation={this.props.navigation} />}
      </Subscribe>
    )
  }
}
