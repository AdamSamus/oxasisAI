import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import {UserProfileDisplay} from './UserProfileDisplay'

import {Colors} from '../styles'
import SettingsStyles from './SettingsStyles'

const styles = SettingsStyles.createStyles()

export default class ManageUsers extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    screenProps: PropTypes.object,
  }

  state = {
    refreshing: false,
  }

  loadUser = async() => {
    await this.props.screenProps.homeStore.fetchUserProfile(this.props.screenProps.auth.currentUser)
  }

  onRefresh = async() => {
    this.setState({refreshing: true});
    await this.loadUser()
    this.setState({refreshing: false});
  }

  handleClickEditProfile = () => {
    this.props.navigation.navigate('ProfileEdit')
  }

  // eslint-disable-next-line complexity
      render() {
             return (<Text>Hello, I'm Empty.</Text>);
         }

}
